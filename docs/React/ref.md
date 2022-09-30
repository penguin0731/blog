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

目前推荐的使用函数或对象来给 ref 属性赋值。

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





