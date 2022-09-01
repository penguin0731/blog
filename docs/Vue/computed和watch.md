# computed和watch

## computed

### 初始化

computed 的初始化发生在 Vue 实例初始化阶段的`beforeCreate`之后，`created`之前，在`initState`函数中。

```js
// src/core/instance/state.ts
export function initState(vm: Component) {
	const opts = vm.$options
	// ...
	if (opts.computed) initComputed(vm, opts.computed)
	// ...
}
```

当 Vue 实例上有 computed 选项时，则进行初始化操作，具体由`initComputed`函数实现：

```js
// src/core/instance/state.ts
const computedWatcherOptions = { lazy: true }
function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = (vm._computedWatchers = Object.create(null))
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = isFunction(userDef) ? userDef : userDef.get
    if (__DEV__ && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm)
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (__DEV__) {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn(
          `The computed property "${key}" is already defined as a method.`,
          vm
        )
      }
    }
  }
}
```

`initComputed`函数首先为 Vue 实例添加了`_computedWatchers`属性，并设置为空对象。

接着开始遍历 computed 选项中的每个属性，尝试获取每个属性的 getter 函数：

- 如果属性值是一个函数，则直接作为 getter 函数
- 如果属性值是一个对象，则获取对象中的 get 属性值作为 getter 函数

然后为 computed 选项中的每个属性创建`computed watcher`，并挂载到`_computedWatchers`属性。这里提一嘴，在创建`computed watcher`的时候，有一个统一的 options 属性，即`lazy`属性，这个属性的作用后续再谈。

```js
const computedWatcherOptions = { lazy: true }
```

最后再判断 computed 选项中的每个属性是否已经被`data`选项或`props`选项占用：

- 如果是，则在开发环境中报相应的警告
- 如果不是，则执行`defineComputed`函数

`defineComputed`函数的实现逻辑如下：

```js
// src/core/instance/state.ts
export function defineComputed(
  target: any,
  key: string,
  userDef: Record<string, any> | (() => any)
) {
  const shouldCache = !isServerRendering()
  if (isFunction(userDef)) {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (__DEV__ && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

`defineComputed`函数做的事情很简单，就是将 computed 选项中的每个属性转换成响应式数据并挂载到 Vue 实例上。

整个 computed 的初始化过程就到此结束。

### 运行机制

接下来，我们结合一个案例来分析`computed watcher`的具体实现：

```js
var vm = new Vue({
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      console.log('fullName运行了');
      return `${this.firstName} ${this.lastName}`;
    }
  }
})
```

我们可以看到，如果没有在模板中使用`this.fullName`，上面的输出语句是不会运行的，这是因为`computed watcher`不会立即执行，因为要考虑到计算属性是否会被 render 函数使用，如果没有使用，就不会执行。

那么为什么`computed watcher`不会立即执行呢？还记不记得刚才提一嘴的`lazy`属性，没错，`lazy`属性的作用就是控制 watcher 是否延迟执行。这里可以看一下 Watcher 构造函数的一部分逻辑：

```js
// src/core/observer/watcher.ts
class Watcher {
  constructor(
    vm: Component | null,
    expOrFn: string | (() => any),
    cb: Function,
    options?: WatcherOptions | null,
    isRenderWatcher?: boolean
  ) {
    // ...
    // parse expression for getter
    if (isFunction(expOrFn)) {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        __DEV__ &&
          warn(
            `Failed watching path: "${expOrFn}" ` +
              'Watcher only accepts simple dot-delimited paths. ' +
              'For full control, use a function instead.',
            vm
          )
      }
    }
    this.value = this.lazy ? undefined : this.get()
  }
}
```

可以看到在初始化 wacher 实例中，将获取到的计算属性的 getter 方法赋值给 watcher 实例上的 getter 属性。

接着根据`lazy`属性来判断是否获取`value`，这里的`this.get()`做的事情主要就是调用对应的计算属性的 getter 方法。

### 访问计算属性

当我们在模板中访问`this.fullName`的时候，就触发了其对应的 getter 方法，getter 方法在`defineComputed`函数中，由`createComputedGetter`函数创建，`createComputedGetter`函数的实现逻辑如下：

```js
// src/core/instance/state.ts
function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

`createComputedGetter`函数返回一个 getter 函数，这个 getter 会拿到对应的`computed watcher`，然后便有了下列的操作：

首先会判断`dirty`属性：

- 如果`dirty`属性为 false，则直接返回`value`
- 如果`dirty`属性为 true，则执行`watcher.evaluate()`

我们看看 watcher 实例上的`evaluate`函数做了什么事情：

```js
// src/core/observer/watcher.ts
evaluate() {
  this.value = this.get()
  this.dirty = false
}
```

可以看到，通过`this.get()`获取计算属性的值，并且将`dirty`属性设置为了 false。那么 get 函数是如何获取的？

```js
// src/core/observer/watcher.ts
get() {
  pushTarget(this)
  let value
  const vm = this.vm
  try {
    value = this.getter.call(vm, vm)
  } catch (e: any) {
    if (this.user) {
      handleError(e, vm, `getter for watcher "${this.expression}"`)
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value)
    }
    popTarget()
    this.cleanupDeps()
  }
  return value
}
```

get 函数首先执行了`pushTarget`，`pushTarget`的实现逻辑如下：

```js
// src/core/observer/dep.js
export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}
```

它将`computed watcher`推入栈，并将`Dep.target`设置为当前的`computed watcher`。

接着就执行了我们在 computed 选项中定义的 getter 函数，即：

```js
function fullName() {
    console.log('fullName运行了');
    return `${this.firstName} ${this.lastName}`;
}
```

需要注意的是，在执行上述 getter 函数时，也是在访问`this.firstName` 和`this.lastName`，而他们也都是响应式数据，同样会触发它们的 getter 函数。因此`computed watcher`会订阅它们，即将它们的`dep`实例添加到自己的`deps`里，作用是当它们发生变化时，会通知`computed watcher`重新计算新的值。

这就是获取计算属性的值（即`value`属性值）的过程。在这个过程中，`Dep.taget`从`computed watcher`变为`render watcher`。

然后判断`Dep.target`，经历过获取`value`属性值后，此时`Dep.target`指向`render watcher`，于是进入判断执行`watcher.depend()`，它的实现逻辑如下：

```js
// src/core/observer/watcher.ts
depend () {
  let i = this.deps.length
  while (i--) {
    this.deps[i].depend()
  }
}
```

遍历 `deps`，调用每个 `dep` 实例的 `depend`方法 ，具体实现如下：

```js
// src/core/observer/dep.ts
depend () {
  if (Dep.target) {
    Dep.target.addDep(this)
  }
}
```

`render wacher`订阅当前的`computed watcher`，当`computed watcher`发生变化（即`value`属性值发生变化）时，通知`render watcher`更新视图。

最后将`value`返回。

这就是访问计算属性的全过程。

### 计算属性的更新机制

当计算属性的依赖发生变化时，由于依赖是响应式数据，那么首先触发的是它的 setter 函数。

而响应式数据的 setter 函数除了更新数据之外，还会通知订阅其变化的所有 watcher 去执行自己的`update`方法进行更新。

对于`computed watcher`，它的`update`方法就是将`dirty`设置为true，在下一个`tick`中计算`value`值。

对于`render watcher`，则是通过调度器去执行更新操作，在这个过程中，会执行 render 函数，由于 render 函数中会访问计算属性，因此触发计算属性的 getter 函数执行，更新`computed watcher`的`value`。

## watch

watch 的初始化发生在 computed 初始化之后，在`initState`函数中。

```js
// src/core/instance/state.ts
export function initState(vm: Component) {
	const opts = vm.$options
  // ...
	if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

当 Vue 实例上有 watch 选项时，则进行初始化操作，具体由`initWatch`函数实现：

```js
// src/core/instance/state.ts
function initWatch(vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
```

Vue 会遍历 watch 选项中的每个属性，尝试获取每个属性的`handler`函数：

- 如果属性值是一个数组，则遍历数组的每一项，获得`handler`函数
- 如果不是，则直接将 watch 的每个选项值作为`handler`函数

接着执行`createWatcher`函数，它的实现逻辑如下：

```js
// src/core/instance/state.ts
function createWatcher(
  vm: Component,
  expOrFn: string | (() => any),
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
```

在`createWatcher`函数中，对`handler`入参的做了更细致的分析：

- 当`handler`入参是对象时，将对象作为`$watch`的配置，将对象中的`handler`属性作为`handler`函数
- 当`handler`入参是字符串时，从 Vue 实例中读取对应的数据作为`handler`函数

然后通过 Vue 原型上的`$watch`方法创建一个`user watcher`，`$watch`的详情用法可参考[官方文档的$watch](https://v2.cn.vuejs.org/v2/api/#vm-watch)，它的实现逻辑如下：

```js
// src/core/instance/state.ts
Vue.prototype.$watch = function (
  expOrFn: string | (() => any),
  cb: any,
  options?: Record<string, any>
): Function {
  const vm: Component = this
  if (isPlainObject(cb)) {
    return createWatcher(vm, expOrFn, cb, options)
  }
  options = options || {}
  options.user = true
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    const info = `callback for immediate watcher "${watcher.expression}"`
    pushTarget()
    invokeWithErrorHandling(cb, vm, [watcher.value], vm, info)
    popTarget()
  }
  return function unwatchFn() {
    watcher.teardown()
  }
}
```

首先判断 cb 入参是否是对象，如果是，则继续执行`createWatcher`。

接着获取 Watcher 配置，并设置`user`属性为 true，然后创建 watcher 实例，表示为`user watcher`。

这里我们也用一个案例帮助我们了解实现`$watch`的核心逻辑：

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

接下来看看 Watcher 构造函数在初始化时具体做了什么事？

```js
// src/core/observer/watcher.ts
class Watcher {
  constructor(
    vm: Component | null,
    expOrFn: string | (() => any),
    cb: Function,
    options?: WatcherOptions | null,
    isRenderWatcher?: boolean
  ) {
    // ...
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.post = false
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = __DEV__ ? expOrFn.toString() : ''
    // parse expression for getter
    if (isFunction(expOrFn)) {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        __DEV__ &&
          warn(
            `Failed watching path: "${expOrFn}" ` +
              'Watcher only accepts simple dot-delimited paths. ' +
              'For full control, use a function instead.',
            vm
          )
      }
    }
    this.value = this.lazy ? undefined : this.get()
  }
}
```

在创建 watcher 实例时，会计算`value`的属性值，那么就需要判断侦听目标的数据类型： 

- 如果是函数，则直接将侦听目标作为 getter 函数
- 如果是字符串，则解析字符串，并返回一个函数作为 getter 函数，该函数会根据解析后的字符串从当前组件实例中获取相应的值

然后将 getter 函数的执行结果赋值给`value`属性。

当我们侦听的响应式数据发生变化时，watcher 实例会进行以下操作：

- 将当前的`value`作为 oldValue
- 触发 getter 函数执行，将执行结果赋值给`value`作为 newValue
- 执行 cb 函数（即 `handler`函数⬇️），并将 newValue 和 oldValue 作为参数传入

```js
handler: function (newVal, oldVal) {
  console.log('fullName运行了');
  const nameList = newVal.split(' ');
  this.lastName = nameList[0];
  this.firstName = nameList[1];
}
```

如果 watcher 实例的`immediate`属性为 true，则在初始化 watcher 后立即执行 cb 函数。

如果 wacher 实例的`deep`属性为 true，则会深度遍历侦听目标，在遍历的过程中会访问它们，进而触发它们的 getter 进行依赖收集，当它们发生变化时，watcher 实例也能够触发 cb 函数。





## 总结

### computed

computed 本质上是一个`computed watcher`，它的初始化发生在 Vue 实例的 beforeCreate 中，它会遍历 computed 选项，将每个属性转换为响应式数据并挂载到 Vue 实例上。

computed 具有缓存机制，由 watcher 实例上的`value`属性和`dirty`属性实现。

`value`属性用于保存 wacher 计算的结果，默认为 undefined。

`dirty`属性用来说明当前的 value 是否已经过时，即是否为脏值，默认为 true。

当我们访问计算属性时，首先会判断`dirty`： 

- 如果`dirty`为false，则直接返回`value`
- 如果`dirty`为true，那么就会执行我们在 computed 选项中定义的 getter 函数，计算得出`value`后，将`dirty`设置为 false

其次，`render watcher`订阅`computed watcher`，当`computed watcher`发生变化时，通知`render watcher`做出响应更新。

最后将 value 返回。

当计算属性的依赖发生变化时，通知订阅其变化的所有 watcher 去执行自己的`update`方法进行更新。

对于`computed watcher`，它的`update`方法就是将`dirty`设置为 true，在下一个`tick`中计算`value`值。

对于`render watcher`，则是通过调度器去执行更新操作，在这个过程中，会执行 render 函数，由于 render 函数中会访问计算属性，因此触发计算属性的 getter 函数执行，更新`computed watcher`的`value`。



### watch

watch 本质是一个`user watche`r，它的初始化发生在 Vue 实例的 beforeCreate 中，它会遍历 watch 选项，通过 Vue 原型上的`$watch`方法为每个选项创建一个`user watcher`。

实现`$watch`的核心逻辑是，通过 Watcher 构造函数创建 watcher 实例，给 wacher 实例的`user`属性设置为 true，表示`user watcher`。

当我们侦听的响应式数据发生变化时，watcher 实例会进行以下操作：

- 将当前的`value`作为 oldValue
- 获取最新的`value`作为 newValue
- 执行cb 函数（即`handler`函数），并将 newValue 和 oldValue 作为参数传入

如果 watcher 实例的`immediate`属性为 true，则在初始化 watcher 后立即执行 cb 函数。

如果 wacher 实例的`deep`属性为 true，则会深度遍历侦听目标，在遍历的过程中会访问它们，进而触发它们的 getter 进行依赖收集，当它们发生变化时，watcher 实例也能够触发 cb 函数。



## 参考链接

- [计算属性 VS 侦听属性](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/computed-watcher.html#computed)
- [响应式原理五：computed](https://juejin.cn/post/7073856712003813384)
- [响应式原理六：watcher](https://juejin.cn/post/7077099321996345351)

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>
