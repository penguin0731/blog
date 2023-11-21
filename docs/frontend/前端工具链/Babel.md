# Babel

Babel 是一个 JavaScript 编译器，主要用于将 ES6+ 代码转换成当前和旧版浏览器能够运行的 JavaScript 代码。

Babel 的主要功能：

- 转换语法：将 ES6+ 新语法转换为 ES5
- Polyfil：添加缺失的特性，如 Promise，Symbol 等，这就是 Polyfil。Babel 提供了一个 Polyfill 功能，能自动引入所需的 Polyfill。这个功能通过  [core-js](https://github.com/zloirock/core-js) 模块实现（Babel v7.4.0 之前使用的是 `@babel/polyfill`），可以模拟整个 ES6 环境。
- 源代码转换 (codemods)
- 插件和预设：插件是小型 JavaScript 程序，指导 Babel 如何对代码进行转换。预设是一组预先确定的插件。

## [快速上手](https://babel.nodejs.cn/docs/usage)

在项目中安装 Babel：

```shell
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

- @babel/core：这个是 Babel 的核心包，提供了核心 API
- @babel/cli：该依赖提供 CLI 命令行工具
- @babel/preset-env：预设环境，即一组预先确定的插件。