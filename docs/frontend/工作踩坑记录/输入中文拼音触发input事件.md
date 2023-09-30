> 2023.09.23

## 问题描述

在常规的监听输入框的 input 事件中，当我们输入中文拼音，并且还未键入中文的情况下，依然会触发 input 事件，然而触发的这些事件是无意义的。

![input-event](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202309231013234.gif)

代码如下：

```html
<input id="input" type="text">
```

```js
var input = document.getElementById('input');
function search() {
	console.log('搜索内容：', input.value);
}
input.addEventListener('input', function () {
	search();
});
```



## 解决过程和方案

JavaScript 中有两个事件可以解决这样的问题，分别为 compositionstart 和 compositionend，表示文本合成开始事件和文本合成结束事件。

```js
var input = document.getElementById('input');
var isComposition = false;
function search() {
	console.log('搜索内容：', input.value);
}
input.addEventListener('input', function () {
	!isComposition && search();
});
input.addEventListener('compositionstart', function () {
	console.log('文本合成开始');
	isComposition = true;
});
// 文本合成结束事件的触发在input事件之后，所以要手动触发一次search
input.addEventListener('compositionend', function () {
	console.log('文本合成结束');
	isComposition = false;
	search();
});
```

![input-event2](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202309231021127.gif)