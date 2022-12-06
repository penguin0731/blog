# DOM事件的传播机制

## 事件

JavaScript 和 HTML 之间的交互是通过事件来实现的。事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间。

## 事件流

当浏览器发展到第 4 代时（IE4 及 Netscape4），浏览器开发团队遇到了一个很有意思的问题：页面的哪一部分会拥有某个特定的事件？

想象在一张纸上的一组同心圆。如果把手指放在圆心上，那么手指指向的不是一个圆，而是纸上的所有圆。

好在IE 和 Netscape 两家开发团队在看待浏览器事件方面是一致的。

当你点击了按钮的同时，你也点击了按钮的容器元素，甚至也点击了整个页面。

事件流，描述的是从页面中接收事件的顺序。有意思的是，IE 和 Netscape 两家开发团队提出了完全相反的事件流概念。

- IE 提出的事件流是事件冒泡流
- Netscape 提出的事件流是是事件捕获流

## 事件冒泡

事件冒泡（event bubbling），即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。

以下面的HTML页面为例：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
        <div id="myDiv"> Click Me </div>
    </body>
</html>
```

如果你点击了页面中的 div 元素，那么这个 click 事件会按照如下顺序传播：

1. `<div>`
2. `<body>`
3. `<html>`
4. `document`

也就是说，click 事件首先发生在 div 元素上，而这个元素就是我们点击的元素。然后，click 事件沿 DOM 树向上传播，在每一级节点上都会发生，直至传播到 document 对象。

下图展示了事件冒泡的过程：

![image-20220827215805284](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208272158595.png)

所有现代浏览器都支持事件冒泡，但在具体实现在还是有一些差别。

IE9、Firefox、Chrome、Safari 将事件一直冒泡到 window 对象。



## 事件捕获

事件捕获（event capturing），即不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。

仍以上面的 HTML 页面作为例子，那么点击 div 元素就会以下列顺序触发 click 事件：

1. `document`
2. `<html>`
3. `<body>`
4. `<div>`

在事件捕获过程中，document 对象首先接收到 click 事件，然后事件沿 DOM 树依次向下，一直传播到事件的实际目标，即 div 元素。

下图展示了事件捕获的过程：

![image-20220827225243275](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208272252355.png)

同样的，IE9、Firefox、Chrome、Safari 是从 window 对象开始捕获事件的。



## DOM 事件流

DOM 事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。

首先发生的是事件捕获，为截获事件提供了机会。然后是实际目标接收到事件，最后是事件冒泡。

仍以上面的 HTML 页面作为例子，那么点击 div 元素就会按照下图顺序触发 click 事件：

![image-20220828160815273](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208281608380.png)

在 DOM 事件流中，目标元素（`<div>`元素）在捕获阶段不会接收事件。这意味着在捕获阶段，事件从 document 到 `<html>` 再到 `<body>`后就停止了。下一个阶段就是「处于目标」阶段，于是事件在目标元素上发生，并在事件处理中被看成冒泡阶段的一部分。然后冒泡阶段发生，事件又传播回 document。



## 事件委托

在 JavaScript 中，添加到页面上的事件数量将直接关系到页面的整体运行性能。

导致这一问题的原因是多方面的：

- 每个函数都是对象，都会占用内存
- 内存中对象越多，性能越差
- 必须事先注册所有事件而导致的 DOM 访问次数，会延迟整个页面的交互就绪时间

对于「注册事件过多」问题的解决方案就是**事件委托**。

事件委托利用的事件冒泡，只注册一个事件，就可以管理某一类型的所有事件。

以下面的 HTML 代码为例：

```html
<ul id="myUl">
  <li id="goSomewhere">Go Somewhere</li>
  <li id="doSomething">Do Something</li>
  <li id="sayHi">Say Hi</li>
</ul>
```

如果我们想为这3个`<li>`元素注册事件，按照传统的方式，代码应该像下面这样写。

```js
var item1 = document.getElementById('goSomewhere');
var item2 = document.getElementById('doSomething');
var item3 = document.getElementById('sayHi');

item1.addEventListener('click', function () {
  location.href = 'https://www.baidu.com';
});
item2.addEventListener('click', function () {
  document.title = 'I changed the title';
});
item3.addEventListener('click', function () {
  alert('Hi');
});
```

如果在一个复杂的应用程序中，对所有可点击的元素都采用这种方式，无疑是增加工作量，并且性能低下的。

此时可以采取事件委托的方式来解决这个问题。只需要在 DOM 树中尽量高的节点上注册事件即可，如下面的例子所示：

```js
var myUl = document.getElementById('myUl');

myUl.addEventListener('click', function (e) {
  var target = e.target;
  switch (target.id) {
    case 'goSomewhere':
      location.href = 'https://www.baidu.com';
      break;
    case 'doSomething':
      document.title = 'I changed the title';
      break;
    case 'sayHi':
      alert('Hi');
      break;
  }
});
```

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>

