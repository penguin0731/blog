# ref

## ref

ref 能够给 React 元素或类组件注册引用信息。

- ref 作用于 React 元素时，得到的是 DOM 对象
- ref 作用于类组件时，得到的是类的实例
- 默认情况下，不能在函数组件上使用 ref 属性，因为它们没有实例。

ref 的使用场景：

- 管理焦点，文本选择或媒体播放
- 触发强制动画
- 集成第三方 DOM 库

::: warning 提示

React 官方不再推荐使用字符串给ref属性赋值，字符串赋值的方式在未来可能会被移除。

:::

目前推荐的使用**函数**或**对象**来给 ref 属性赋值。

### 对象

通过 React.createRef 函数创建。

以下代码以对象的方式去注册 React 元素的引用信息：

```jsx
import React, { Component } from 'react';

class Comp extends Component {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }
  
  handleClick = () => {
    this.inputRef.focus();
  }
  
  render () {
    return (
      <div>
        <input ref={this.inputRef} type='text' />
        <button onClick={this.handleClick}>聚焦</button>
      </div>
    );
  }
}
```



### 函数

传递一个函数给 ref 属性，这个函数会接收一个参数作为 React 元素或类组件实例。

ref 回调函数的调用时机：

- componentDidMount 的时候会调用该函数
- 如果 ref 的值发生了变动（旧的 ref 回调函数被新的 ref 回调函数替代），分别调用旧的 ref 回调函数和新的 ref 回调函数，发生在 componentDidUpdate 之前
  - 旧的 ref 回调函数执行时，参数值为 null
  - 新的 ref 回调函数执行时，参数值为 DOM对象或类组件实例
- 如果 ref 所在的组件被卸载，会调用函数

```jsx
import React, { Component } from 'react';

class Comp extends Component {
  constructor (props) {
    super(props);
    this.inputRef = null;
    this.setInputRef = ele => {
      this.inputRef = ele;
    }
  }
  
  handleClick = () => {
    this.inputRef.focus();
  }
  
  render () {
    return (
      <div>
        <input ref={this.setInputRef} type='text' />
        <button onClick={this.handleClick}>聚焦</button>
      </div>
    );
  }
}
```

## ref转发

ref 转发只适用于函数组件，它的使用场景是想要获取 React 函数组件中的子元素，而非函数组件本身。

通过 `React.forwardRef` 来传递 React 函数组件的ref 属性到子元素中，当然也能够传递到子类组件中。

函数组件的第二个参数 ref，只有在使用 `React.forwardRef`来定义组件时才会存在。

```jsx
import React, { Component } from 'react';

const AComp = React.forwardRef((props, ref) => {
  return (
    <h1 ref={ref}>
    	test
      <button>按钮</button>
    </h1>
  );
})

export default class App extends Component {
  
  aRef = React.createRef();
  
  componentDidMount () {
    console.log(this.aRef);
  }
  
  render () {
    return (
    	<AComp ref={aRef} />
    )
  }
}
```

如果一定要对类组件进行 ref 转发，那么只需要用一个函数组件包装即可。

```jsx
import React, { Component } from 'react

class A extends Component {
  render () {
    return (
      <h1 ref={this.props.childRef}>
        test
        <button>按钮</button>
      </h1>
    );
  }
}

const AComp = React.forwardRef((props, ref) => {
  // 注意这里不能传递ref属性，因为ref属性是特殊属性，指向的是类组件实例
  return (<A {...props} childRef={ref} />);
})

export default class App extends Component {
  
  aRef = React.createRef();
  
  componentDidMount () {
    console.log(this.aRef);
  }
  
  render () {
    return (
    	<AComp ref={aRef} />
    );
  }
}
```

