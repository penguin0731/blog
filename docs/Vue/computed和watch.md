# computed和watch

## computed

computed的初始化发生在Vue实例的`beforeCreate`中，Vue会遍历computed选项中的每个属性，尝试获取每个属性的`getter`函数：

- 如果属性值是一个函数，则直接作为getter函数
- 如果属性值是一个对象，则获取对象中的get属性值作为getter函数

然后为每个`getter`函数创建一个`computed watcher`，最后再判断computed选项中的每个属性是否已经被`data`选项或`props`选项占用：

- 如果是，则在开发环境中报相应的警告
- 如果不是，则利用`Object.defineProperty`给computed选项的每个属性转换成响应式数据并挂载到Vue实例中

整个computed的初始化过程就到此结束。

我们再来看看`computed watcher`和`render watcher`的区别，这里我们通过一个案例来分析`computed watcher` 的实现：

```js
var vm = new Vue({
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      console.log('fullName运行了');
      return this.firstName + ' ' + this.lastName;
    }
  }
})
```

我们可以看到，如果没有在模板中使用`this.fullName`，上面的输出语句是不会运行的，这是因为`computed watcher`不会立即执行，因为要考虑到计算属性是否会被render函数使用，如果没有使用，就不会执行。

在控制台将vm实例输出，对比`_computedWatchers`属性和`_watcher`属性（即`computed watcher`和`render watcher`），可以看到它们的`lazy`属性不同，因为`lazy`属性的作用是控制watcher是否立即执行。

由于`lazy`属性的存在，`computed wacher`内部通过两个属性来实现了缓存效果，分别是`value`属性和`dirty`属性。

`value`属性用于保存wacher计算的结果，默认为undefined。

`dirty`属性用来说明当前的value是否已经过时，即是否为脏值，默认为true。

### 访问计算属性

当我们在模板中访问`this.fullName`的时候，就触发了其对应的getter，getter会拿到对应的`computed watcher`，然后便有了下列的操作：

首先会判断`dirty`：

- 如果`dirty`为false，则直接返回`value`
- 如果`dirty`为true，那么就会执行我们在computed选项中定义的getter函数，即：

```js
function fullName() {
    console.log('fullName运行了');
    return this.firstName + ' ' + this.lastName
}
```

由于`this.firstName`和`this.lastName`是响应式对象，因此访问它们时会触发它们各自的getter函数，然后就能计算得出`value`，再把`dirty`设置为false。

其次，`computed watcher`收集`render watcher`依赖，当`computed watcher`发生变化时，通知`render watcher`做出响应更新。

最后将value返回。

### 计算属性的更新机制

当计算属性的依赖发生变化时，由于依赖是响应式数据，那么首先触发的是它的setter函数。

而响应式数据的setter函数除了更新数据之外，还会通知订阅其变化的所有watcher去执行自己的`update`方法进行更新。

对于`computed watcher`，它的`update`方法就是将`dirty`设置为true，再下一个`tick`中计算`value`值。

对于`render watcher`，则是通过调度器去执行更新操作。

## watch

watch的初始化也发生在Vue实例的`beforeCreate`中，在computed之后，Vue会遍历watch选项中的每个属性，尝试获取每个属性的`handler`函数：

- 如果属性值是一个字符串，则根据字符串从当前的组件实例中获取作为handler函数
- 如果属性值是一个函数，则直接作为handler函数
- 如果属性值是一个对象，则获取对象中的handler属性值作为handler函数
- 如果属性值是一个数组，则遍历数组的每一项，根据上述情况处理，获得handler函数

然后通过`$watch`方法为每一个handler函数创建一个`user watcher`，`$watch`的详情用法可参考[vm.$watch](https://v2.cn.vuejs.org/v2/api/#vm-watch)。

这里我们也用一个案例帮助我们了解实现$watch的核心逻辑：

```js
var vm = new Vue({
  data: {
    fullName: 'Foo Bar',
    firstName: '',
    lastName: ''
  },
  watch: {
    fullName: {
      immediate: true,
      handler: function (newVal, oldVal) {
        console.log('fullName运行了');
        const nameList = newVal.split(' ');
        this.lastName = nameList[0];
        this.firstName = nameList[1];
      }
    }
  }
})
```

首先通过Watcher构造函数创建watcher实例，给wacher实例的user属性设置为true，表示user watcher。

在创建watcher实例时，会计算value的属性值，那么就需要判断侦听目标的数据类型： 

- 如果是函数，则直接将侦听目标作为getter函数
- 如果是字符串，则解析字符串，并返回一个函数作为getter函数，该函数会根据解析后的字符串从当前组件实例中获取相应的值

然后将getter函数的执行结果赋值给value属性。

当我们侦听的结果发生变化时：

- 将当前的value作为oldValue
- 触发getter函数执行，将执行结果赋值给value作为newValue
- 执行cb函数（即handler函数⬇️），并将newValue和oldValue作为参数传入

```js
handler: function (newVal, oldVal) {
  console.log('fullName运行了');
  const nameList = newVal.split(' ');
  this.lastName = nameList[0];
  this.firstName = nameList[1];
}
```

如果watcher实例的immediate属性为true，则立即执行cb函数。

如果wacher实例的deep属性为true，则会深度遍历侦听目标，在遍历的过程中会访问它们，进而触发它们的getter进行依赖收集，当它们发生变化时，watcher实例也能够触发cb函数。











## 总结





## 参考链接

- [计算属性 VS 侦听属性](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/computed-watcher.html#computed)



