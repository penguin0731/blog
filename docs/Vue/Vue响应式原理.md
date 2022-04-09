> 资料参考：[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

::: tip 提示

我们都知道Vue实现响应式的核心就是利用了ES5的Object.defineProperty，这也是为什么Vue.js不能兼容 IE8 及以下浏览器的原因。

:::

# 整体流程

这里贴一张官方的流程图来进行描述。

每个组件实例都对应一个Watcher实例，它会在组件渲染虚拟Dom树的过程中把“接触”过的数据记录为依赖项（“接触”其实就是触发了数据的getter）。之后当数据的setter触发时，会通知Watcher，从而使它关联的组件重新渲染。

![image-20220409221917140](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220409221917140.png)

# 实现核心

在Vue响应式数据的实现逻辑里，有这样几个核心：

## Observer

通过Object.defineProperty将一个普通对象变为一个具有getter和setter的响应式对象。

![image-20220409222028675](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220409222028675.png)

Observer是Vue内部的构造器，我们可以通过Vue提供的静态方法Vue.observable(object)间接的使用该功能。

在组件生命周期中，这件事发生在beforeCreate之后，created之前。

具体实现上，它会递归遍历对象的所有属性，以完成深度的属性转换。

由于遍历时只能遍历到对象的当前属性，因此无法监测到将来动态增加或删除的属性，因此Vue提供了$set和$delete两个实例方法，让开发者通过这两个实例方法对已有响应式对象添加或删除属性。

对于数组，Vue会更改它的隐式原型，之所以这样做，是因为Vue需要监听那些可能改变数组内容的方法。

![image-20220409222152194](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220409222152194.png)

总之，Observer的目标，就是要让一个对象，它属性的读取、赋值，内部数组的变化都要能够被Vue感知到。

## Dep

响应式对象都有getter和setter两个属性，当我们访问或设置响应式对象的属性时，getter和setter会分别被调用，而getter和setter具体要做什么，这个需要Dep来解决，没错，Dep的作用就是管理依赖。

Dep的含义是Dependency，表示依赖的意思。

Observer会为每个响应式对象创建Dep实例，并在getter和setter中调用Dep的实例方法来达到某些目的，就是收集依赖和派发更新。

在响应式对象的getter中，通过Dep.depend收集依赖，收集依赖的目的是为了当这些响应式数据发生变化，触发它们的setter的时候，能知道应该通知哪些Wathcer去做相应的逻辑处理，我们把这个过程叫派发更新。

在响应式对象的setter中，通过Dep.notify派发更新，通知对应的Watcher去重新运行render函数渲染组件。

![image-20220409222359480](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220409222359480.png)

## Watcher

这里又出现一个问题，就是Dep如何知道是谁在用我？

当某个函数执行的过程中，用到了响应式数据，然而响应式数据是无法知道是哪个函数在用自己。

因此，Vue通过一种巧妙的办法来解决这个问题。

我们不要直接执行函数，而是把函数交给Wathcer去执行，当我们创建一个Wathcer实例的时候，会把这个当前执行的Wathcer记录到 Dep.target 中，然后再去执行函数。在函数执行的过程中，如果发生了收集依赖Dep.depend，那么Dep会将这个Wathcer记录下来，等到Dep触发派发更新时，它会通知自己记录下来的Wathcer。

![image-20220409222742015](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220409222742015.png)

每个Vue组件都会有一个Watcher实例，Watcher实例中记录了该组件的render函数，Watcher 首先会将render函数执行一次，在这个过程中会使用到响应式数据，也就触发了getter收集依赖。

当数据变化时，Dep就会通知该Watcher，而Watcher将重新运行render函数，从而让界面重新渲染同时重新记录当前的依赖。

::: warning 注意

重新记录依赖的时候，会将上一次记录的依赖清空。

:::

## Scheduler

最后一个问题，就是Dep通知Watcher之后，如果Watcher执行重运行对应的函数，就有可能导致函数频繁运行，从而导致效率低下。

试想，如果一个交给 Watcher的函数，它里面用到了属性a、b、c、d，那么a、b、c、d属性都会记录依赖，于是下面的代码将触发4次更新：

```js
vm.a = "new data";
vm.b = "new data";
vm.c = "new data";
vm.d = "new data";
```

这样显然是不合适的，因此，Watcher收到派发更新的通知后，并不会立即执行对应的函数，而是把自己交给一个叫调度器的东西。

调度器维护一个执行队列，该队列中相同的Watcher仅会存在一个，因此像上面这个Wacther的例子一样被多次触发，只会被推入到队列中一次，这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的。

队列中的Watcher不是立即执行的，而是通过一个叫nextTick的工具方法，把这些需要执行的Watcher一起放入到事件循环的微队列中，注意这里不是直接在nextTick中执行函数，而是将这些函数push到一个叫callbacks的数组，然后对callbacks遍历，执行相应的函数，原因是这样做不会开启多个异步任务，而把这些异步任务都压成一个同步任务。

也就是说，当响应式数据变化时，render函数的执行是异步的，并且在微队列中，这就是为什么当我们需要获取更新后的DOM时，要在 nextTick中来获取。

# 总结

最后用自己话总结一下整个流程。

在Vue响应式数据的实现逻辑里，有这样四个核心，分别是Observer、Dep、Watcher、Scheduler。

![image-20220409223805445](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220409223805445.png)

1. 原始对象经过Observer变成具有getter和setter的响应式对象
2. 由Watcher执行第一次render函数，触发响应式对象的getter进行依赖收集（Dep.depend），记录相关的Watcher
3. 当响应式对象被改变时，触发setter进行派发更新（Dep.notify），通知之前记录的Watcher去执行render函数
4. 然而Watcher并不会立即执行，而是通过Scheduler将自己放入到一个队列中，这个过程会去重，相同的Watcher只留下一个，然后将这些Watcher的执行函数映射成一个数组，通过nextTick放到微队列中，按照事件循环机制执行，即执行完同步任务，按顺序执行异步任务中的微任务，执行到执行函数时，就再次触发Watcher执行render函数，再次收集依赖，等待派发更新