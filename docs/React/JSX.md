# JSX简介

JSX是Facebook起草的JavaScript扩展语法，React推荐在React中配合使用JSX，它有点类似模板语言，能够很好的描述HTML结构。每个JSX有且只有一个根节点，并且必须有`/>`结束标签（遵守XML规范）。

## 使用

### 定义一个JSX

```jsx
const element = <h1>Hello, world!</h1>;
```

### 在JSX中插入表达式

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
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

### JSX也是一个表达式

```jsx
function sayHello(isChild) {
	return isChild ? <h1>Hello Child</h1> : <h1>Hello Man</h1>;
}
```

### JSX属性

属性名均使用小驼峰命名

::: warning 注意

因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用小驼峰命名来定义属性的名称，而不使用 HTML 属性名称的命名约定。

例如，JSX 里的 `class` 变成了 `className`，而 `tabindex` 则变为 `tabIndex`。

:::

```jsx
const element = <div tabIndex="0"></div>;
```

### JSX 防止注入攻击

你可以安全地在 JSX 当中插入用户输入内容：

```jsx
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

