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

