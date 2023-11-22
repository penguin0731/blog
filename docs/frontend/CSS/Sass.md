# Sass

Sass 是 CSS 的一个预处理器。它提供了变量、嵌套规则、混合、函数等功能，并且完全兼容 CSS 的写法。

预编译语言可以让开发者使用增强的语法书写 CSS，书写完毕后编译成普通的 CSS 即可。

## 快速上手

### 安装

```shell
npm i sass -D
```

### 示例

在根目录中创建 `base.scss` 文件，并输入以下代码：

```scss
// base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  background-color: $primary-color;
}
```

创建 `index.scss` 文件，并输入以下代码：

```scss
// index.scss
@use './base.scss';

$primary-color: #4caf50;

.container {
  background-color: $primary-color;
  padding: 20px;

  .title {
    font-size: 24px;
    color: white;
  }
}

```

创建 index.html 文件，并输入以下代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div class="container">
    <h1 class="title">标题</h1>
  </div>
</body>
</html>
```

在 `package.json` 中编写 scripts 命令：

```json
{
	"scripts": {
		"complie": "sass --watch index.scss index.css"
	}
}
```

运行 `npm run compile` 即可看到效果。

## 基本语法

### 嵌套规则

Sass 可以通过嵌套来表示选择器的父子关系

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

complier result：

```scss
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```



### 变量

变量声明以`$`符号开头。

```scss
// 声明变量
$width: 1600px;
$pen-size: 3em;

div{
  width: $width;
  font-size: $pen-size;
}
```

complier result：

```css
div {
  width: 1600px;
  font-size: 3em;
}
```

变量的声明时支持块级作用域的，如果是在一个嵌套规则内部定义的变量，那么就只能在嵌套规则内部使用（局部变量），如果不是在嵌套规则内定义的变量那就是全局变量。

```scss
// 声明变量
$width: 1600px;

div{
  $width: 800px;
  $color: red;

  p.one{
    width: $width; /* 800px */
    color: $color; /* red */
  }
  
}

p.two{
  width: $width; /* 1600px */
  color: $color; /* 报错，因为 $color 是一个局部变量 */
}
```

### 七种数据类型

#### Numbers

分为带单位的数字和不带单位的数字。

```scss
$my-age: 19;
$your-age: 19.5;
$height: 120px;
```

### Strings

分为带引号和不带引号的字符。

```scss
$name: 'Tom Bob';
$container: "top bottom";
$what: heart;
```

### Booleans

只有两个值 true 和 false，可以进行逻辑运算，支持 and、or、not 关键字来进行运算。

```scss
$a: 1>0 and 0>5; // false
$b: "a" == a; // true
$c: false; // false
$d: not $c; // true
```

### null

只有一个值 null，表示空值。

因为是空值，所以不能和其他类型进行运算。

```scss
$value: null;
```

### List

数组，通常以空格或逗号分隔。

```scss
$list0: 1px 2px 5px 6px;
$list1: 1px 2px, 5px 6px;
$list2: (1px 2px) (5px 6px);
```

关于数组有以下的注意事项：

1. 数组里面可以包含子数组，例如 1px 2px, 5px 6px 就是包含了两个数组，1px 2px 是一个数组，5px 6px 又是一个数组，如果内外数组的分隔方式相同，例如都是采用空格来分隔，这个时候可以使用一个小括号来分隔 (1px 2px) (5px 6px)
2. 添加了小括号的内容最终被编译为 CSS 的时候，是会被去除掉小括号的

```scss
$list2: (1px 2px) (5px 6px);

div{
  padding: $list2;
}
```

complier result：

```css
div {
  padding: 1px 2px 5px 6px;
}
```

3. 可以使用 nth 函数去访问数组里面的值，注意数组的下标是从 1 开始的。

```scss
$fontSize: 14px 16px 18px 20px 22px 24px;

div {
  font-size: nth($fontSize, 1); // 14px
}

p {
  font-size: nth($fontSize, -1); // 24px
}
```

4. 遍历数组

```scss
$sizes: 40px 50px 60px;

@each $s in $sizes {
  .icon-#{$s} {
    font-size: $s;
    width: $s;
    height: $s;
  }
}
```

complier result：

```
.icon-40px {
  font-size: 40px;
  width: 40px;
  height: 40px;
}

.icon-50px {
  font-size: 50px;
  width: 50px;
  height: 50px;
}

.icon-60px {
  font-size: 60px;
  width: 60px;
  height: 60px;
}
```



### Maps

字典，使用小括号包裹，以键值对的形式存储。

```scss
$font-weights: (
  "regular": 400, 
  "medium": 500, 
  "bold": 700
);
```

通过 map.get 获取对应的值。

```scss
map.get($font-weights, "medium"); // 500
map.get($font-weights, "extra-bold"); // null
```

遍历

```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

complier result：

```scss
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f112";
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f12e";
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f12f";
}
```



### Colors

颜色，支持十六进制、RGB、RGBA、HSL、HSLA、颜色单词。

Sass 还内置了许多颜色相关的函数：

- lighten 和 darken：调整颜色亮度

```scss
$color : red;

.div1{
  width: 200px;
  height: 200px;
  background-color: lighten($color, 10%); // 亮度增加10%
}

.div2{
  width: 200px;
  height: 200px;
  background-color: darken($color, 10%); // 亮度减少10%
}
```

- saturate 和 desaturate：调整颜色的饱和度

```scss
$color: #4caf50;

.div1{
  width: 200px;
  height: 200px;
  background-color: saturate($color, 10%); // 饱和度增加10%
}

.div2{
  width: 200px;
  height: 200px;
  background-color: desaturate($color, 10%); // 饱和度减少10%
}
```

- adjust hue：通过调整颜色的色相来创建新颜色。

```scss
$color: #4caf50;
$new-hue: adjust-hue($color, 30); // 色相增加 30 度
```

- rgba：调整颜色的透明度

```scss
$color: #4caf50;
$transparent: rgba($color, 0.5); // 添加 50% 透明度
```

- mix：混合两种颜色。

```scss
$color1: #4caf50;
$color2: #2196f3;
$mixed: mix($color1, $color2, 50%); // 混合两种颜色，权重 50%
```

## @规则

### @use

在样式表中导入变量、函数、mixins，在编译时，它们将被整合进一个文件中。

样式表的私有成员以 `-` 或`_`开头，加载此模块的样式表无法使用它们。

```scss
$primary-color: red;
$_bgColor: #c6538c;

body {
  background-color: $_bgColor;
}

@mixin color {
  color: desaturate($primary-color, 10%);
}
.container {
  height: 200px;
  border: 1px solid;
}

```

```scss
// index.scss
@use './base.scss' as baseModule;

$primary-color: #4caf50;
$pd: 10px;
$padding: 2 * $pd;
$fontSize: 14px 16px 18px 20px 22px 24px;

.container {
  height: 400px;
  background-color: $primary-color;
  padding: $padding;

  .title {
    // background-color: $_bgColor; // 报错，$_bgColor是私有变量
    font-size: nth($fontSize, 1); // 14px
    @include baseModule.color;
  }
}

```

comlier result：

```css
body {
  background-color: #c6538c;
}

.container {
  height: 200px;
  border: 1px solid;
}

.container {
  height: 400px;
  background-color: #4caf50;
  padding: 20px;
}
.container .title {
  font-size: 14px;
  color: #f20d0d;
}

/*# sourceMappingURL=index.css.map */

```

::: warning 注意

Sass 官方建议不要使用 @import，而是使用 @use 来代替，并打算在将来删除 @import。

这是因为 @import 有以下几点问题：

- @import 使得所有的变量、函数、mixins 都可以全局访问，这会让开发者（或工具）很难分辨它们来自哪里
- 因为是全局的，所以导致其他库需要为自己的成员添加前缀来避免命名冲突
- 使用 @extend 时也是全局的，这很难分辨哪些样式会被继承
- 每次 @import 样式表时，都会执行一遍并生成css，这会增加编译时间和冗余输出。
- 无法定义私有成员

:::



### @extend

继承样式。

```scss
.button {
  display: inline-block;
  padding: 20px;
  background-color: red;
  color: white;
}

.primary-button{
  @extend .button;
  background-color: blue;
}
```

@extend 与 @mixins 很相似，都是能够提取公共的样式，但他们是有区别的：

- 参数支持：@mixin 支持传递参数，使其更具灵活性；而 @extend 不支持参数传递。
- 生成的 CSS：@extend 会将选择器合并，生成更紧凑的 CSS，并且所继承的样式在最终生成的 CSS 样式中也是真实存在的；而 @mixin 会在每个 @include 处生成完整的 CSS 代码，做的就是一个简单的 CSS 替换。
- 使用场景：@extend 更适用于继承已有样式的情况，例如 UI 框架中的通用样式；而 @mixin 更适用于需要自定义参数的情况，例如为不同组件生成类似的样式。

