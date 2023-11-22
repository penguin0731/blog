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
- @babel/preset-env：预设环境，即一组预先确定的插件

## 规则配置

在项目根目录下创建 `babel.config.json`文件（需要 `v7.8.0` 及更高版本），编写 json 格式配置。

### plugins

插件。

属性值为一个数组，注意使用到的插件需要提前进行安装。

```json
{
  "plugins": [["@babel/plugin-transform-arrow-functions", {}]]
}
```



### presets

预设。

属性值为一个数组，注意使用到的预设需要提前进行安装。

```json
{
  "presets": ["@babel/preset-env"]
}
```

官方提供了 4 套预设：

- @babel/preset-env 用于编译 ES6 及以上版本的语法
- @babel/preset-typescript 用于 TypeScript
- @babel/preset-react 用于 React
- @babel/preset-flow 用于 Flow

### tagets

指定要兼容的浏览器版本范围。

```json
{
  "targets": "> 0.25%, not dead"
}
```

### env

根据不同的环境提供不同配置。

```json
{
  "env": {
    "development": {
      "plugins": ["pluginA"]
    },
    "production": {
      "plugins": ["pluginB"]
    }
  }
}
```

### sourceMaps

是否生成 sourceMaps。

```json
{
 "sourceMaps": true
}
```

### sourceFileName

指定 sourceMaps 生成的文件名。

```json
{
 "sourceFileName": "mySourceMap.js"
}
```

### sourceRoot

指定 sourceMaps 生成的文件路径。

```json
{
  "sourceMaps": true,
  "sourceFileName": "mySourceMap.js",
  "sourceRoot": "/souceMapDir/" // 前缀
}
```

## CLI

### --out-file（or -o）

输出文件。

```shell
# 编译script.js输出到script-compiled.js 
babel script.js --out-file script-compiled.js 
```

### --out-dir（or -d）

输出目录。

```shell
# 编译src目录输出到lib目录
babel src --out-dir lib
```

### --watch（or -w）

监听变化。

```shell
# 每当script.js发生变化时重新编译
babel script.js --watch --out-file script-compiled.js 
```

### --ignore

忽略文件。

```shell
# 忽略src目录下面的所有规范和测试文件
babel src --out-dir lib --ignore "src/**/*.spec.js","src/**/*.test.js"
```

### --copy-files 

复制文件。

```shell
# 将 src 目录下的文件原封不动的复制到 lib 目录下
babel src --out-dir lib --copy-files 
```

