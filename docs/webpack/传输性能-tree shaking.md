# tree shaking

代码压缩可以清除模块内部的无用代码，而tree shaking可以清除模块中未引用的代码。

## 使用场景

当我们只需要使用某个模块中的其中一个方法时，该模块的其他方法则是多余的。

```js
// myMath.js
export function sum(a, b){
  console.log("sum")
  return a+b;
}

export function sub(a, b){
  console.log("sub")
  return a-b;
}
```

```js
// index.js
import { sum } from "./myMath"
console.log(sum(1,2));
```

此时我们可以通过使用tree shaking将模块多余的代码清除。

## 用法

webpack2就开始支持了tree shaking，只要是生产环境，tree shaking就会自动开启。

## 原理

webpack会从入口模块出发寻找依赖关系。

当解析一个模块时，webpack会根据ES6的模块导入语句来判断，该模块依赖了另一个模块的哪个导出。

webpack之所以选择ES6的模块导入语句，是因为ES6模块有以下特点：

1. 导入导出语句只能是顶层语句
2. import的模块名只能是字符串常量
3. import绑定的变量是不可变的

这些特征都非常有利于分析出稳定的依赖。

这些特征都非常有利于分析出稳定的依赖

在具体分析依赖时，webpack坚持的原则是：**保证代码正常运行，然后再尽量tree shaking**。

所以，如果你依赖的是一个导出的对象，由于JS语言的动态特性，以及`webpack`还不够智能，为了保证代码正常运行，它不会移除对象中的任何属性。

因此，我们在编写代码的时候，**尽量**：

- 使用`export xxx`导出，而不使用`export default {xxx}`导出
- 使用`import {xxx} from "xxx"`导入，而不使用`import xxx from "xxx"`导入