# JSX 简介

JSX 是 Facebook 起草的 JavaScript 扩展语法，React 推荐在 React 中配合使用 JSX，它有点类似模板语言，能够很好的描述 HTML 结构。每个 JSX 有且只有一个根节点，并且必须有`/>`结束标签（遵守XML规范）。

## 使用

### 定义一个 JSX

推荐使用`()`将元素包裹，表示为表达式。因为在 JavaScript 中，`()`可以表示为表达式。

每个 JSX 有且只有一个根节点。

```jsx
const element = (<h1>Hello, world!</h1>);
```

如果必须要定义两个相邻节点，且不想要根元素的话，可以使用`<></>`包裹。

`<></>`其实就是`<React.Fragment></React.Fragment>`的语法糖。

```jsx
const element = (
	<>
		<h1>Hello, world!</h1>
		<h2>this is jsx</h2>
	</>
);
```

### 在 JSX 中插入表达式

```jsx
const name = 'Josh Perez';
const element = (<h1>Hello, {name}</h1>);
const root = (
	<div>
        {/* 使用注释 */}
		<h1>Hello!</h1>
		<h2>Good to see you here.</h2>
        {/* null，undefined，false不会显示 */}
        <h3>{undefined}{null}{false}</h3>
	</div>
);
```

### JSX 属性

属性名均使用小驼峰命名

::: warning 注意

因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用小驼峰命名来定义属性的名称，而不使用 HTML 属性名称的命名约定。

例如，JSX 里的 `class` 变成了 `className`，而 `tabindex` 则变为 `tabIndex`。

:::

```jsx
const element = (<div tabIndex="0"></div>);
```

### JSX 防止注入攻击

你可以安全地在 JSX 当中插入用户输入内容：

```jsx
const title = "<h1>我是一段文本<h1>";
// 直接使用是安全的：
const element = (<div>{title}</div>);
```

如果确实需要将输入内容作为 React 元素进行编译，那么可以使用`dangerouslySetInnerHTML`属性。

::: danger 注意

请谨慎使用`dangerouslySetInnerHTML`属性！

:::

```jsx
const title = "<h1>我是一段文本<h1>";
// 直接使用是安全的：
const element = (<div dangerouslySetInnerHTML={{ __html: title }}></div>);
```



### JSX的本质是对象

Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用。

以下两种示例代码完全等效：

```jsx
const element = (
	<h1 className="greeting">
		Hello, world!
	</h1>
);
```

```jsx
const element = React.createElement(
	'h1',
	{className: 'greeting'},
	'Hello, world!'
);
```

## 参考资料

- [官方文档 - JSX简介](https://react.docschina.org/docs/introducing-jsx.html)


