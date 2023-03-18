# 【ES6+】Promise

## 关于异步编程

无论是在浏览器环境还是在 node 环境，我们都会使用 JavaScript 完成各种异步操作，如在浏览器环境中的定时器、事件、ajax 等或是node 环境中的文件读取、事件等。伴随着异步编程的就是回调机制，我们需要明确的是异步编程避免不了回调。

异步编程产生的问题：

- 回调地狱，难以维护和扩展
- try catch 只能捕获同步代码中的异常
- 同步并发的异步存在一定的问题

而 Promise 的出现，就是为了解决这些异步编程产生的问题。

::: warning 注意

Promise 并不能消除回调，它只是让回调变得可控。

也就是说，Promise 把执行代码和处理结果清晰地分开了。

:::

## Promise API

Promise 有三种状态：

- pending：初始状态，表示操作进行中
- fulfilled：已兑现，表示操作成功
- rejected：已拒绝，表示操作失败

Promise 构造函数接收一个函数作为参数，一般情况下我们称这个函数为执行函数（executor），执行函数有两个参数，分别是 resolve 和 reject，它们两个也是函数，它们的作用就是改变 Promise 的状态。

resolve 函数执行时，会将 Promise 的状态从 pending 变为 fulfilled。

reject 函数执行时，会将 Promise 的状态从 pending 变为 rejected。

```js
var promise = new Promise((resolve, reject) => {
    // do something
    setTimeout(() => {
        Math.random() > 0.5 ? resolve('ok') : reject('no');
    });
});
```

在创建好 promise 实例后，我们可以通过实例上的 then 函数和 catch 函数来获取操作成功或失败的结果。

### then

then 函数有两个参数，一个是 fulfilled 状态的回调函数，另一个（可选）是 rejected 状态的回调函数。

```js
promise.then(res => {
	console.log(res);
}, err => {
	console.log(err);
});
```

then 函数会返回一个新的 promise 实例，因此可以链式调用。回调函数的返回会作为这个新 promise 的结果。

::: tip 提示

执行函数是同步执行，then 函数和 catch 函数都是异步执行，且属于微任务，详细请了解[事件循环](../浏览器/浏览器中的事件循环.md)

:::

```js
setTimeout(() => {
    console.log(4);
});
new Promise(resolve => { 
    resolve(1);
    console.log(3);
}).then(res => {
	console.log(res);
	return 2;
}).then(res => {
	console.log(res);
});

// 3
// 1
// 2
// 4
```

回调函数也允许返回一个 promise，这个 promise 的状态和结果，会作为 then 函数返回的 promise 的状态和结果。

```js
var p1 = new Promise((resolve, reject) => {
    reject(11);
});

var p2 = new Promise(resolve => {
    resolve();
}).then(() => {
    return p1;
}).catch(res => {
    console.log(res); // 11
});
```

上面的代码中，p2 的第一个 then 函数中的回调函数返回了 p1 实例，那么第一个 then 函数返回的 promise 的状态和结果由 p1 决定，当 p1 的状态发生改变时，这个 promise 的状态也会随之改变。

### catch

catch 函数相当于`.then(null, catchable)`，用来捕获程序错误和 reject 函数传递的结果。

```js
var promise = new Promise((resolve, reject) => {
	reject('no');
}).catch(err => {
	console.log(err); // 'no'
})
```

我们一般不推荐在 then 函数中定义 rejected 状态的回调函数，即 then 的第二个参数。

```js
// bad
promise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
});

// good
promise.then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
```

上面的代码中，第二种代码写法要好于第一种，因为它能够捕获前面 then 的程序错误，也更方便理解，因此建议用 catch 函数而不是 then 的第二个参数。

### Promise.resolve

Promise.resolve 函数接收一个参数作为结果，并且返回一个状态为 fulfilled 的 promise 实例。

```js
var p = Promise.resolve('success');
p.then(res => {
	console.log(res); // success
});
```

### Promise.reject

Promise.reject 函数接收一个参数作为结果，并且返回一个状态为 rejected 的 promise 实例。

```js
var p = Promise.reject('fail');
p.catch(res => {
	console.log(res); // fail
});
```

### Promise.all

Promise.all 函数接收一个数组作为参数，数组成员是 promise 实例，当所有的数组成员的状态都变成 fulfilled 时，会将成功的结果数组传递给 fulfilled 状态的回调函数。如果其中一个 promise 状态变为 rejected，那么就会立即将这个失败的结果传递给 rejected 状态的回调函数。

```js
var p1 = Promise.resolve(1);
var p2 = 123;
var p3 = Promise.reject(2);

// 如果数组成员里包含了非promsie的值，那么它会被忽略并且返回到结果数组中
Promise.all([p1, p2]).then(res => {
	console.log(res); // [1, 123]
});

Promise.all([p1, p3]).catch(err => {
    console.log(err); // 2
});
```

### Promise.race

race 有赛跑的意思，Promise.race 函数的参数与 Promise.all 一致，因此它会将第一个发生状态改变的 promise 的结果传递给对应状态的回调函数。

```js
var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success 0.5s');
    }, 500);
});
var p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success 0.1s');
    }, 100);
});
var p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('fail 0.2s');
    }, 200);
});

Promise.race([p1, p2]).then(res => {
	console.log(res); // success 0.1s
});

Promise.race([p1, p3]).then(res => {
    console.log(res); // 不会执行
}).catch(err => {
    console.log(err); // fail 0.2s
});
```

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>
