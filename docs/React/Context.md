# Context

我们知道 React 应用中的数据是通过 props 属性自上而下（由父到子）进行传递的，但是在某些场景中，这个做法是极其繁琐的。

例如：一个父组件有一个数据 foo，而它的孙组件依赖于数据 foo，那么父组件则需要将数据 foo 传递给子组件，再由子组件传递给孙组件，对于子组件来说，数据 foo 是没有意义的。如果中间层数过多，那么这个数据传递就会更加繁琐。

Context 就能解决这个问题，它的作用的是共享那些对于一个组件树而言是「全局」的数据。

Context 有以下特点：

- 当某个组件创建了上下文后，上下文中的数据，会被所有后代组件共享
- 如果某个组件依赖了上下文，会导致该组件不再纯粹（纯粹组件的数据仅来源于属性props）
- 一般情况下，用于第三方组件（通用组件）

## 创建上下文

上下文通过`React.createContext`创建，该方法会返回一个 Context 对象。

```js
const MyContext = React.createContext(defaultValue);
```

Context 对象中包含两个属性：

- Provider：生产者，它是一个组件。该组件会创建一个上下文，有一个 value 属性，通过该属性，可以为其数据赋值
  - 同一个 Provider，不要在多个组件中使用，如果需要在其他组件中使用该数据，应该考虑将数据提升到更高的层次
- Consumer：后续讲解



## 读取上下文中的数据

### 类组件

首先需要将 Context 对象赋值给类组件的 contextType 属性，然后通过`this.context`就可以访问到上下文中的数据了。我们可以在任何生命周期函数中访问它，包括render函数。

```js
class MyClass extends React.Component {
	static contextType = MyContext;
	componentDidMount() {
		console.log(this.context);
	}
	componentDidUpdate() {
		console.log(this.context);
	}
	componentWillUnmount() {
		console.log(this.context);
	}
	render() {
		console.log(this.context);
	}
}
```



### 函数组件



