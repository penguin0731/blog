# computed和watch

## computed

computed的初始化发生在Vue实例的`beforeCreate`中，Vue会遍历computed选项中的每个属性，尝试获取每个属性的`getter`函数，然后为每个`getter`函数创建一个`computed watcher`，最后再判断computed选项中的每个属性是否已经被`data`选项或`props`选项占用，如果是的话则在开发环境中报响应的警告，如果不是，则利用`Object.defineProperty`给computed选项的每个属性进行代理并挂载到Vue实例中。

整个computed的初始化过程就到此结束。

我们再来看看`computed watcher`和`render watcher`的区别，这里我们通过一个案例来分析`computed watcher` 的实现。

```js
var vm = new Vue({
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      console.log('fullName运行了');
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

我们可以看到，如果没有在模板中使用`this.fullName`，上面的输出语句是不会运行的，这是因为`computed watcher`不会立即执行，因为要考虑到计算属性是否会被render函数使用，如果没有使用，就不会执行。

将vm实例在控制台输出，对比`_computedWatchers`属性和`_watcher`属性（即`computed watcher`和`render watcher`），可以看到它们的`lazy`属性不同，因为`lazy`属性的作用是控制watcher是否立即执行。

由于`lazy`属性的存在，wacher内部通过两个属性来实现了缓存效果，分别是`value`属性和`dirty`属性。

`value`属性用于保存wacher计算的结果，默认为undefined。

`dirty`属性用来说明当前的value是否已经过时，即是否为脏值，默认为true。

当我们在模板中访问`this.fullName`的时候，就触发了其对应的getter，getter会拿到对应的`computed watcher`，然后进行依赖收集，计算得到最新结果。

在计算的过程中，首先会判断dirty，如果`dirty`为false，则直接返回`value`。如果`dirty`为true，那么就会执行我们在computed选项中定义的getter函数，即：

```js
function fullName() {
    console.log('fullName运行了');
    return this.firstName + ' ' + this.lastName
}
```

然后把`dirty`设置为false。

这里有一个巧妙点，就是在依赖收集时，被依赖的数据不仅会收集到`computed watcher`，还会收集到`render watcher`

## watch







## 总结







