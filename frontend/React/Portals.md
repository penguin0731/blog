# Portals

 Portals 能够将目标 React 元素渲染到我们指定的真实 DOM 元素中。

常用于对话框、悬浮卡、提示框等场景。

```react
ReactDom.createPortal(child, container)
```

第一个参数（child）是 React 元素，第二参数（container）是真实 DOM 元素，该函数会返回一个 React 元素。

## 用法

```html
<!-- html -->
<div id="root"></div>
<div class="modal"></div>
```

```jsx
// jsx
import ReactDOM from 'react-dom';

function TestA() {
    return ReactDOM.createPortal(<div className="test-a">
        <h1>TestA</h1>
        <TestB />
    </div>, document.querySelector('.modal'))
}

function TestB() {
    return <div className="test-b">
        <h1>TestB</h1>
    </div>
}

export default function Test() {
  return (
    <div className="test">
        <h1>Test</h1>
        <TestA />
    </div>
  )
}

```

最终真实 DOM 的渲染如下：

![image-20230116143630391](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202301161436523.png)



::: warning 注意冒泡事件

React 事件是包装过的，它的事件冒泡是根据 React 树来进行冒泡的，与最终渲染的真实 DOM 树无关。

:::

我们在 Test 组件中添加点击事件，来看看效果。

```jsx
// jsx
import ReactDOM from 'react-dom';

function TestA() {
    return ReactDOM.createPortal(<div className="test-a">
        <h1>TestA</h1>
        <TestB />
    </div>, document.querySelector('.modal'))
}

function TestB() {
    return <div className="test-b">
        <h1>TestB</h1>
    </div>
}

export default function Test() {
  return (
    <div className="test" onclick={e => {
        console.log('test被点击了', e.target)
      }}>
        <h1>Test</h1>
        <TestA />
    </div>
  )
}


```

![image-20230116144813716](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202301161448762.png)

可以看到，我们点击 TestA 的时候，事件冒泡触发了 Test 组件上的点击事件。 