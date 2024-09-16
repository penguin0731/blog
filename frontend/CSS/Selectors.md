# Selectors

## 通配符选择器

通配符选择器使用`*`表示，它可以匹配任意类型的HTML元素。

::: warning 注意

不推荐使用通配符选择器，因为它是性能最低的CSS选择器。

:::

```css
* {
    color: red;
}
```



## 元素选择器

元素选择器使用HTML元素名称匹配HTML元素。

```css
span {
	color: red;
}
```

## 类选择器

类选择器使用`.`表示，它会根据HTML元素中的class属性值来匹配HTML元素。

```html
<span class="classy">Here's a span with some text.</span>
<span>Here's another.</span>
```

```css
.classy {
	color: red;
}
```

## ID选择器

ID选择器使用`#`表示，它会根据HTML元素中的id属性值来匹配HTML元素。

```html
<span id="identified">Here's a span with some text.</span>
<span>Here's another.</span>
```

```css
#identified {
	color: red;
}
```

## 伪类选择器

伪类选择器表示指定元素的某个状态。

常用的伪类选择器：

- `:hover`：用户鼠标悬停的元素，在移动端上不可用
- `:active`：被用户激活的元素，一般用在`<a>`和`<button>`元素上
- `:checked`：处于选中状态的radio、checkbox或select元素中的option元素
- `:disabled`：被禁用的元素
- `:focus`：聚焦的元素，如输入框
- `:not()`：匹配不符合选择器的元素，如`:not(span.classy)`，表示匹配没有classy类名的span元素
- `:first-of-type`：一组兄弟元素中同类型的第一个元素

```html
<div>
  <p>This text is red!</p>
  <p>This text isn't red.</p>
</div>

<div>
  <h2>This text isn't red: it's not a `p`.</h2>
  <p>This text is red!</p>
</div>
```

```css
p:first-of-type {
  color: red;
}
```

- `:last-of-type`：一组兄弟元素中同类型的最后一个元素
- `:nth-of-type(n)`：一组兄弟元素中同类型的第n个元素，可以用odd表示奇数，用even表示偶数
- `:nth-of-last-type(n)`：一组兄弟元素中同类型的倒数第n个元素，可以用odd表示奇数，用even表示偶数
- `:first-child`：一组兄弟元素中的第一个元素

```html
<div>
  <p>This text is red!</p>
  <p>This text isn't red.</p>
</div>

<div>
  <h2>This text isn't red: it's not a `p`.</h2>
  <p>This text isn't red: it's not the first element.</p>
</div>
```

```css
p:first-child {
  color: red;
}
```

- `:last-child`：一组兄弟元素中的最一个元素

## 伪元素选择器

伪元素选择器表示指定元素的特定部分。

常用的伪元素选择器：

- `::before`：创建一个伪元素作为元素的第一个子元素，默认为行内元素
- `::after`：同`::before`，但它是最后一个子元素
- `::selection`：被用户选中高亮的部分
- `::placeholder`：表单元素的占位文本

## 属性选择器

属性选择器用`[]`表示，它通过已存在的属性名或属性值匹配元素。

```css
/* 存在title属性的<a> 元素 */
a[title] {
  color: purple;
}

/* 存在href属性并且属性值匹配"https://example.org"的<a> 元素 */
a[href="https://example.org"] {
  color: green;
}

/* 存在href属性并且属性值包含"example"的<a> 元素 */
a[href*="example"] {
  font-size: 2em;
}

/* 存在href属性并且属性值结尾是".org"的<a> 元素 */
a[href$=".org"] {
  font-style: italic;
}

/* 存在class属性并且属性值包含以空格分隔的"logo"的<a>元素 */
a[class~="logo"] {
  padding: 2px;
}
```

## 相邻兄弟选择器

相邻兄弟选择器用`+`表示，用来匹配某个元素后的第一个兄弟节点。

```css
/* 图片后的段落会被选中 */
img + p {
	color: red;
}
```

## 通配兄弟选择器

通配选择器用`~`表示，用来匹配某个元素后所有的兄弟节点，无需相邻。

```css
/* 图片后的所有段落都会被选中 */
img ~ p {
	color: red;
}
```

