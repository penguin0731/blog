# Vue3 和 Vue2 的区别

## 响应式数据的实现

Vue3 使用 `Proxy` 来代替 Vue2 的 `Object.defineProperty` 来实现响应式数据，因为 `Proxy`的执行效率比`Object.defineProperty`要好。

### 为什么 `Proxy`的 执行效率比`Object.defineProperty`要好？

要明白这个问题，先看它们是如何工作的。

#### Object.defineProperty

`Object.defineProperty`需要递归遍历原始对象的属性，因为它只能监听基本数据类型，无法监听引用数据类型。同时还有一个很大的问题就是它无法监听到原始对象新增、删除的属性。

这就是为什么 Vue2 需要重写数组方法，并且有 `$set` 和 `$delete`两个方法。

```js
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    f: [4, 5, 6],
  },
};

function observe(obj) {
  for (const key in obj) {
    let value = obj[key];
    if (typeof value === "object" && value !== null) {
      observe(value);
    } else {
      Object.defineProperty(obj, key, {
        get() {
          console.log(`读取了${key}`);
          return value;
        },
        set(v) {
          if (v !== value) {
            console.log(`修改了${key}`);
            value = v;
          }
        },
      });
    }
  }
}

observe(obj);

obj.a; // 读取了a
obj.c.d = 1; // 修改了d
obj.c.f.push(7);
obj.e = 0;
delete obj.a;
```

#### Proxy

`Proxy` 不像 `Object.defineProperty` 那样监听原始对象的属性，而是直接监听整个对象，因此`Proxy`并不需要去递归遍历原始对象的属性，在这一点上，`Proxy` 的执行效率就比 `Object.defineProperty` 高。

```js
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    f: [4, 5, 6],
  },
};

function reactive(obj) {
  return new Proxy(obj, {
    get(target, k) {
      console.log(`读取了${k}`);
      const retult = Reflect.get(target, k);
      if (typeof target[k] === "object" && target[k] !== null) {
        return reactive(target[k]);
      }
      return retult;
    },
    set(target, k, v) {
      if (Reflect.has(target, k)) {
        console.log(`修改了${k}`);
      } else {
        console.log(`新增了${k}`);
      }
      return Reflect.set(target, k, v);
    },
    deleteProperty(target, k) {
      console.log(`删除了${k}`);
      return Reflect.deleteProperty(target, k);
    },
    has(target, key) {
      console.log(`判断属性${key}是否存在`);
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      console.log(`迭代属性`);
      return Reflect.ownKeys(target);
    },
  });
}

const proxy = reactive(obj);

proxy.a = 0; // 读取了a
proxy.c.f.push(7);
// 读取了c
// 读取了f
// 读取了push
// 读取了length
// 新增了3
// 修改了length
delete proxy.b; // 删除了b
"a" in proxy; // 判断属性a是否存在
Object.keys(proxy); // 遍历属性
```

细心的小伙伴会发现，在读取的时候，也有递归，但这个递归并不是在初始化的时候进行的，而是在读取的属性是一个对象的时候进行的，因为我们需要确保读取的对象是一个代理对象而不是原始对象。

我们还能看到 `Proxy` 不仅可以拦截原始对象的属性的读取和设置，还能拦截属性判断和遍历操作，这是因为这些操作都属于对象的基本操作，而 `Proxy` 能够做到的正是这些。

总结，`Proxy` 比 `Object.defineProperty` 的执行效率高的原因在于，`Object.defineProperty` 监听的是属性，在初始化时需要递归遍历属性，而 `Proxy` 监听的是对象的基本操作，并且不需要递归遍历属性，只有在读取的属性是一个对象时才会递归。

## Vue3 新增了 Composition API





## Vue3 删除了 Vue 构造函数

Vue3 不再通过 `new Vue()`来创建 vue 应用/组件，而是改为 createApp 函数。

这是因为 Vue 构造函数有诸多问题：

- Vue 构造函数上的静态方法，会影响所有的 vue 应用，不利于隔离不同的 vue 应用
- Vue 构造函数集成了太多功能，不利于 tree shaking，Vue3 将这些功能作为普通函数导出，就能够充分利用 tree shaking 来优化打包体积
- Vue2 中通过 `new Vue()`创建的对象既是一个 vue 应用，也是一个 vue 组件，将应用和组件的概念混淆了。在 Vue3 中，通过 createApp 创建的对象，是一个 vue 应用，它内部提供的方法是针对整个应用的，而不再是一个特殊的组件