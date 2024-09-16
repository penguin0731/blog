# tree shaking

代码压缩可以清除模块内部的无用代码，而 tree shaking 可以清除模块中未引用的代码。

## 使用场景

当我们只需要使用某个模块中的其中一个方法时，该模块的其他方法则是多余的。

```js
// myMath.js
export function sum(a, b){
  console.log("sum")；
  return a + b;
}

export function sub(a, b){
  console.log("sub");
  return a - b;
}
```

```js
// index.js
import { sum } from "./myMath";
console.log(sum(1, 2));
```

此时我们可以通过使用 tree shaking 将模块多余的代码清除。

## 用法

webpack2 就开始支持了 tree shaking，只要是生产环境，tree shaking 就会自动开启。

## 原理

webpack 会从入口模块出发寻找依赖关系。

当解析一个模块时，webpack 会根据 ES6 的模块导入语句来判断，该模块依赖了另一个模块的哪个导出。

webpack 之所以选择 ES6 的模块导入语句，是因为 ES6 模块有以下特点：

1. 导入导出语句只能是顶层语句
2. import 的模块名只能是字符串常量
3. import 绑定的变量是不可变的

这些特征都非常有利于分析出稳定的依赖。

在具体分析依赖时，webpack 坚持的原则是：**保证代码正常运行，然后再尽量 tree shaking**。

所以，如果你依赖的是一个导出的对象，由于 JavaScript 的动态特性，以及 webpack 还不够智能，为了保证代码正常运行，它不会移除对象中的任何属性。

因此，我们在编写代码的时候，**尽量**：

- 使用`export xxx`导出，而不使用`export default {xxx}`导出
- 使用`import {xxx} from "xxx"`导入，而不使用`import xxx from "xxx"`导入

依赖分析完毕后，webpack会根据每个模块每个导出是否被使用，标记其他导出为`dead code`，然后交给代码压缩工具处理，代码压缩工具最终会移除掉那些`dead code`代码。

## 使用第三方库

某些第三方库可能使用的是 Commonjs 的方式导出，比如 lodash，又或者使用了 ES6 Module 的方式，但没有使用基本导出而是默认导出。

对于这些库，tree shaking 是无法发挥作用的，因此要寻找这些库的 ES6 版本，好在很多流行但没有使用的 ES6 的第三方库，都发布了它的 ES6 版本，比如 lodash-es。

## 作用域分析

tree shaking 本身并没有完善的作用域分析，可能导致在一些`dead code`函数中的依赖仍然会被视为依赖。

```js
// utils.js
import { isArray } from 'lodash-es';

export function add(a, b) {
    return a + b;
}

export function sub(a, b) {
    return a - b;
}

export function isArr(data) {
    console.log('isArray');
    return isArray(data);
}
```

```js
// index.js
import { add } from './utils.js';

console.log(add(1, 2));
```

我们可以看到，上述代码中，虽然 utils 文件有依赖 lodash的isArray 方法，但是在整个工程中其实并没有使用到这个方法，所以应该是需要被移除的，但是我们可以发现打包文件里依然存在 isArray 方法，这就是因为 tree shaking 的作用域分析还不够完善。

使用插件`webpack-deep-scope-plugin`可解决作用域分析的问题。

```js
const DeepScope = require("webpack-deep-scope-plugin").default;
export default {
    mode: 'production',
	plugins: [
        new DeepScope()
	]
}
```

由于这个插件会深度分析作用域，对构建速度是有影响的，并且该插件目前已经长期没有维护，因此需要根据实际情况进行权衡。

## 副作用函数问题

webpack 在 tree shaking 的使用，有一个原则：**一定要保证代码正确运行**。在满足该原则的基础上，再来决定如何 tree shaking。

因此，当 webpack 无法确定某个模块是否有副作用时，它往往将其视为有副作用，这也导致某些情况可能并不是我们所想要的。

```js
//common.js
var n  = Math.random();

//index.js
import "./common.js";
```

虽然我们根本没用有`common.js`的导出，但 webpack 担心`common.js`有副作用，如果去掉会影响某些功能。

如果要解决该问题，就需要标记该文件是没有副作用的。

在`package.json`中加入`sideEffects`：

```js
{
    "sideEffects": false
}
```

有两种配置方式：

- false：当前工程中，所有模块都没有副作用。注意，这种写法比较暴力，不建议使用
- 数组：设置哪些文件拥有副作用，例如：`["!src/common.js"]`，表示只要不是`src/common.js`的文件，都有副作用

这种方式我们一般不处理，通常是一些第三方库在它们自己的`package.json`中标注。

