# Postcss

Postcss 是 CSS 的一个后处理器，通过 JavaScript 工具和插件转换 CSS 代码。

后处理器是在原生的 CSS 代码上做处理的，主要做的是：

- 兼容性处理：自动添加浏览器前缀（如 -webkit-、-moz- 和 -ms-）来确保跨浏览器兼容。典型的工具就是 autoprefixer。
- 代码优化与压缩：移除多余的空格、注释和未使用的规则，以减小 CSS 的大小。典型的工具就是 cssnano。
- 功能扩展：添加新的 CSS 特性，能够让开发者使用最新的特性并保证能够在所有浏览器中运行。典型的工具就是 Postcss。
- 代码检查与规范：检查 CSS 代码质量，以确保代码符合规范和最佳实践。典型里的工具就是 stylelint。

这么多的工具，显然对于开发者而言，操作起来是非常吃力的。我们只需要一个能够使用所有工具的集合，那就 Postcss。

Postcss 类似 Babel，它主要负责的就是将代码转换成抽象语法树，然后通过插件来实现其他的事情。

## 快速上手

### 安装

```shell
npm i -D postcss postcss-cli
```

### 示例

在根目录创建 `index.css`，并输入以下代码：

```css
body {
    background-color: beige;
    font-size: 16px;
}

.box1 {
    transform: translate(100px);
}

.box2{
    transform: translate(200px);
}
```

安装 `autoprefixer`插件：

```shell
npm i autoprefixer -D
```

在根目录创建`postcss.config.js`配置文件，并输入以下代码：

```js
const autofixer = require("autoprefixer");
module.exports = {
  map: false, // 是否内联sourcemap
  plugins: [
    autofixer()
  ],
};
```

在根目录创建`.browserslistrc`文件，并输入以下代码：

```
last 10 version
```

在 `package.json` 中编写 scripts 命令：

```json
{
	"scripts": {
		"build": "postcss index.css -o build.css",
	}
}
```

运行 `npm run build` 即可看到效果。

## 常用插件

需要注意，postcss 的配置文件中的插件是从左往右执行的。

### autoprefixer

自动添加浏览器前缀。

```shell
npm i autoprefixer -D
```

通过 browserlist 指定兼容的浏览器版本范围，配置 browserlist 的方式有三种，这里只写推荐的一种：创建`.browserslistrc`文件，在该文件中进行配置。

browserlist 的配置规则：

- last n versions：支持最近的 n 个浏览器版本。last 2 versions 表示支持最近的两个浏览器版本
- n% ：支持全球使用率超过 n% 的浏览器。 > 1% 表示要支持全球使用率超过 1% 的浏览器
- cover n%：覆盖 n% 的主流浏览器
- not dead：支持所有“非死亡”的浏览器，已死亡的浏览器指的是那些已经停止更新的浏览器
- not ie<11：排除 ie 11 以下的浏览器
- chrome>=n ：支持 chrome浏览器大于等于 n 的版本

### cssnano

压缩 CSS 代码。

```shell
npm i cssnano -D
```

cssnano 本身的默认配置已经做的很好了，因此基本上不需要做其他的配置。

### stylelint

stylelint 是规范我们 CSS 代码的，能够将 CSS 代码统一风格。

```
npm i stylelint stylelint-config-standard -D
```

这里我们安装了两个依赖：

- stylelint：做 CSS 代码风格校验，但是具体的校验规则它是不知道了，需要我们提供具体的校验规则
- stylelint-config-standard：这是 stylelint 的一套校验规则，并且是一套标准规则

在根目录下创建`.stylelintrc`文件，并输入以下代码：

```json
{
    "extends": "stylelint-config-standard"
}
```

stylelint 插件需要在 plugins 选项中排第一位。

### postcss-preset-env

让开发者可以使用最新的 CSS 语法，并将这些语法转化为能够兼容旧版浏览器的代码。

```shell
npm i postcss-preset-env -D
```



### postcss-import

处理 CSS 中的 @import 规则，将有依赖关系的 CSS 文件合并成一个文件，避免浏览器解析 CSS 时产生额外的 HTTP 请求。

```shell
npm i postcss-import -D
```



### purgecss

移除 CSS 中没有使用到的样式，类似 Tree Shaking。

```shell
npm i @fullhuman/postcss-purgecss -D
```

```js
module.exports = {
  plugins: [
    require("postcss-import")({
      path: ["src/css"]
    }),
    require("postcss-preset-env")({
      stage: 2,
    }),
    require("@fullhuman/postcss-purgecss")({
      content: ['./src/**/*.html']
    })
  ],
};
```

