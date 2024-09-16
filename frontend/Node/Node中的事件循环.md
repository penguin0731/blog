# Node中的事件循环

Node中有一个重要的库libuv，它封装了不同操作系统的一些底层特性，对外提供统一的API，事件循环机制也是它里面的实现。

libuv库中的事件循环分为6个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会去执行该阶段队列中的回调函数，直到队列中的回调函数被清空或已达到执行的最大回调数，满足该条件时，会自动进入下一个阶段。

![image-20220621100906629](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220621100906629.png)

从上图中，大致看出Node中的事件循环的顺序：

外部的请求连接、数据等 --> poll 轮询阶段 --> check 检查阶段 --> close callbacks 关闭回调阶段 --> timers 定时器阶段 --> pending callbacks 等待回调阶段 --> idle, prepare 阶段 --> poll 轮询阶段（按照该顺序反复运行）...

## 阶段概述

- **timers 定时器：这个阶段执行 `setTimeout()`和`setInterval()`的回调函数**
- pending callbacks 等待回调：执行上一轮循环中未执行的 I/O 回调
- idle, prepare：仅系统内部使用
- **poll 轮询：除了timers、check阶段的回调，大部分的回调都在此阶段执行（如文件读取，监听用户请求等）**
- **check 检查：这个阶段执行`setImmediate()`的回调函数**
- close callbacks 关闭回调：一些准备关闭的回调函数，如：`socket.on('close', ...)`

我们可以理解为每个阶段有各自的队列。在日常开发中，我们只需关注**timers、poll和check**阶段即可。

## timers

timers 阶段会执行 `setTimeout()`和`setInterval()`的回调函数，并且是由 poll 阶段控制何时执行的。需要注意的是，因为libuv需要将所有定时器线程调出来查看哪个定时器即将达到指定的阈值，才能知道需要执行哪个定时器的回调函数，这个过程需要耗费时间，因此**在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行**。

## poll

当进入到poll阶段且timers队列没有回调函数时，会发生以下两种情况之一：

- 当poll队列不为空时，执行poll队列中的回调，直到清空为止
- 当poll队列为空时，还有两件事发生

  - 如果check队列中有setImmediate的回调函数，那么将结束poll阶段，进入到check阶段并执行setImmediate的回调函数
  - 如果check队列中没有setImmediate的回调函数，那么将持续等待，直到有回调添加到队列中，然后立即去执行

当poll队列为空且timers队列中有回调函数时，事件循环将回到timers阶段去执行timers队列中的回调函数。

## check

`setImmediate()`的回调函数会被添加到check队列中，当poll阶段结束时，会立即执行。

## setTimeout0与setImmediate的区别

`setTimeout0`与`setImmediate()`的效果很相似，但是他们进入的队列不是同一个，这也导致它们进入队列的时机也不同。

- `setTimeout()`进入的timers队列需要遍历所有定时器线程，并计算哪些定时器线程已经达到时间阈值，需要耗费时间
- `setImmediate()`并不需要什么操作，直接添加到check队列

```js
let i = 0;
console.time();
function test() {
  i++;
  if (i < 1000) {
    setImmediate(test);
  } else {
    console.timeEnd();
  }
}
test();
```

```js
let i = 0;
console.time();
function test() {
  i++;
  if (i < 1000) {
    setTimeout(test, 0);
  } else {
    console.timeEnd();
  }
}
test();
```

上述两段代码分别运行，可以看出`setImmediate()`在性能上要比`setTimeout()`高很多。

当`setImmediate()`和`setTimeout()`都在主模块（全局上下文）中运行时，它们的执行顺序是不确定的，因为它们受进程的性能影响：

```js
setImmediate(() => {
  console.log('immediate');
});

setTimeout(() => {
  console.log('timeout');
}, 0);
```

将上述代码多次运行，即可看出执行顺序的不确定性。

但如果将它们放入到I/O回调里调用，那么`setImmediate()`总是被优先调用：

```js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

因为I/O回调是在poll阶段执行的，当执行完毕，poll队列为空时，会立即执行check队列中的`setImmediate()`的回调。

## process.nextTick、Promise().then

尽管在Node.js的官方文档中没有提到宏任务和微任务的概念，但是我们依旧可以将各个阶段的队列理解为宏任务，将process.nextTick和Promise().then理解为微任务。

每次执行宏任务前，事件循环会查看是否还有微任务可执行，如果有则将微任务队列清空。

```js
setImmediate(() => {
  console.log(1);
});

process.nextTick(() => {
  console.log(2);
  process.nextTick(() => {
    console.log(6);
  });
});

console.log(3);

Promise.resolve().then(() => {
  console.log(4);
  process.nextTick(() => {
    console.log(5);
  });
});

// 执行结果：
// 3
// 2
// 6
// 4
// 5
// 1
```

##  Node不同版本中事件循环的差异

在Node11版本以下，每执行完一个阶段中的所有宏任务，才会清空微任务队列

在Node11版本及以上，与浏览器的行为统一，即每执行一个宏任务，才会清空微任务队列

```js
function test () {
   console.log('start');
    setTimeout(() => {
        console.log('children2');
        Promise.resolve().then(() => {console.log('children2-1')});
    }, 0);
    setTimeout(() => {
        console.log('children3');
        Promise.resolve().then(() => {console.log('children3-1')});
    }, 0);
    Promise.resolve().then(() => {console.log('children1')});
    console.log('end');
}

test();

// 上述代码在Node11版本以下的执行结果：
// start
// end
// children1
// children2
// children3
// children2-1
// children3-1

// 上述代码在Node11版本及以上的执行结果：
// start
// end
// children1
// children2
// children2-1
// children3
// children3-1
```


## 参考链接

- [浏览器与Node的事件循环(Event Loop)有何区别? ](https://juejin.cn/post/6844903761949753352#heading-13)


