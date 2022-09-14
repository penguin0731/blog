# React 组件

React 组件有两种类型：

- 函数组件
- 类组件

## 函数组件

需要返回一个 React 元素，并且只接收一个入参作为组件属性。

::: warning 注意： 组件名称必须以大写字母开头。

React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<MyFunc />` 则代表一个组件，并且需在作用域内使用 `MyFunc`。

:::

```jsx
import React from 'react';

export default function MyFunc(props) {
    return (
      <h1>
        我是函数组件，数字{props.number}, 名字{props.name}
      </h1>
    );
}

<MyFunc number={1} name="tom" />
```



## 类组件

必须继承 `React.Component`，必须提供`render`函数。

```jsx
import React from 'react';

export default class MyClass extends React.Component {
    contructor (props) {
        super(props); // 相当于 this.props = props
    }

    render () {
        return (
          <h1>
            我是类组件, 数字{this.props.number}, 名字{this.props.name}
          </h1>
        );
    }
}

<MyClass number={1} name="tom" />
```

## 组件状态

组件状态（component state），指的是组件自行维护的数据。

### 初始化状态

在类组件的构造函数中，定义 state 属性。

```jsx
contructor (props) {
	super(props);
	this.state = {
		num: 1
	};
}
```

### 改变状态

使用`this.setState({})`改变状态，不能直接改变 state，因为 React 无法监控到 state 的变化。

一旦调用`this.setState({})`，就会导致组件重新渲染。

```jsx
this.setState({
	num: 2
});
```

## 事件

React 组件中的事件，本质上就是一个属性。React 组件的属性都遵循小驼峰命名的规则。

**如果没有特殊处理，在事件处理函数中，this指向undefined。**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class MyComp extends React.Component {
    handleClick () {
        console.log(this); // undefined
    }

    render () {
        return (<h1 onClick={this.handleClick}>测试</h1>);
    }
}

ReactDOM.render(<MyComp number={10}/>, document.getElementById('root'));
```

有两种方式可以解决：

- 使用bind方法重新绑定this

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class MyComp extends React.Component {
	constructor (props) {
		super(props);
		this.handleClick = this.handlClick.bind(this);
	}
  
	handleClick () {
		console.log(this);
	}

	render () {
		return (<h1 onClick={this.handleClick}>测试</h1>);
	}
}

ReactDOM.render(<MyComp number={10}/>, document.getElementById('root'));
```

- 使用箭头函数

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class MyComp extends React.Component {
    handleClick = () => {
        console.log(this);
    }

    render () {
        return (<h1 onClick={this.handleClick}>测试</h1>);
    }
}

ReactDOM.render(<MyComp number={10}/>, document.getElementById('root'));
```

