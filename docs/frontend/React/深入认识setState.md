# 深入认识setState

## 不要直接修改state

例如，此代码不会重新渲染组件：

```jsx
// bad
this.state.comment = 'Hello';
```

而是应该使用 `this.setState()`：

```jsx
// good
this.setState({comment: 'Hello'});
```

## state的更新可能是异步的

如下列代码，我们无法在修改 `state` 后拿到最新的 `state`：

```jsx
import React from 'react';

export default class MyComp extends React.Component {
  state = {
    x: 0
  }
  
  handleClick = () => {
    this.setState({
      x: this.state.x + 1
    });
    console.log(this.state.x);
  }
  
	render () {
		console.log('render');
		return (
			<div>
				<h1>{this.state.x}</h1>
				<button onClick={this.handleClick}>+</button>
			</div>
		)
	}
}


// 点击1次按钮后，控制台输出为：
// 0
// render
```

要解决这个问题，可以让 `this.setState()` 接收第二个参数，这个参数是一个回调函数，会在 `state` 更新完毕并且重新渲染后执行。

```jsx
import React from 'react';

export default class MyComp extends React.Component {
  state = {
    x: 0，
    y: 0
  }
  
  handleClick = () => {
    this.setState({
      x: this.state.x + 1
    }, () => {
      console.log(this.state.x);
      this.setState({
        y: this.state.x * 2
      });
    });
  }
  
	render () {
		console.log('render');
		return (
			<div>
				<h1>{this.state.x}</h1>
				<h1>{this.state.y}</h1>
				<button onClick={this.handleClick}>+</button>
			</div>
		)
	}
}


// 点击1次按钮后，控制台输出为：
// render
// 1
```

接收一个回调函数作为`this.setState`的第二个参数虽然是一种解决方案，但是当我们某些数据需要依赖其他最新的数据时，回调函数会显得不那么优雅。

那么可以让 `this.setState()` 的第一个参数接收一个函数而不是一个对象。这个函数使用上一次更新的 `state` 作为第一个参数：

```jsx
import React from 'react';

export default class MyComp extends React.Component {
  state = {
    x: 0,
    y: 0
  }
  
  handleClick = () => {
    this.setState(state => ({
      x: state.x + 1
    }));
    this.setState(state => ({
      y: state.x * 2
    }));
  }
  
	render () {
		console.log('render');
		return (
			<div>
				<h1>{this.state.x}</h1>
				<h1>{this.state.y}</h1>
				<button onClick={this.handleClick}>+</button>
			</div>
		)
	}
}
```

## state的更新会被合并

当 `state` 中存在多个独立的变量，并且分别被单独更新时，这些 `state` 的更新会被统一合并更新。

```jsx
import React from 'react';

export default class MyComp extends React.Component {
  state = {
    foo: [],
    bar: [6, 6, 6]
  }
  
  change = () => {
    this.setState({
      foo: this.state.foo + 1
    });
    this.setState({
      foo: this.state.foo + 2
    }, () => {
      console.log(this.state)
    });
  }
  
	render () {
		console.log('render');
		return (
			<div>
				<button onClick={this.change}>change</button>
			</div>
		)
	}
}
```

可以看到，我们在`change`函数中调用了两次`this.setState`，在更新后 `state` 依然保留了`bar`变量，并且`render`函数只执行了一次，这是因为 React 对`this.setState`做了优化，多次执行时，统一将最终的结果赋值给 `state`，再执行`render`函数。

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>