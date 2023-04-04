---
sidebarDepth: 2
---
# grid布局

grid 布局，又称为网格布局。



## 容器的属性

### display

通过`display: grid`或`display: inline-grid`可以将指定元素变为网格容器，该元素的所有直系子元素将成为网格项目。

其中，`display: grid`表示该容器是一个块级元素，`display: inline-grid`表示该容器是一个行级元素。

```css
element {
	display: grid;
}
```

### grid-template-columns 属性和 grid-template-rows属性

grid-template-columns 属性设置的是网格容器的列宽，grid-template-rows 属性设置的是网格容器的行高。

```html
<div class="wrapper">
  <div class="one"></div>
  <div class="two"></div>
  <div class="three"></div>
  <div class="four"></div>
  <div class="five"></div>
  <div class="six"></div>
  <div class="one"></div>
  <div class="two"></div>
</div>
```

```css {11,13}
.wrapper {
  width: 860px;
  height: 500px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  grid-template-columns: 200px 200px 200px;
  /* 设置行高，行数为1，超出的行数将平分剩余容器的高度 */
  grid-template-rows: 200px;
}

.one {
  background-color: #19CAAD;
}

.two {
  background-color: #8CC7B5;
}

.three {
  background-color: #D1BA74;
}

.four {
  background-color: #BEE7E9;
}

.five {
  background-color: #E6CEAC;
}

.six {
  background-color: #ECAD9E;
}
```

效果如下：

![image-20230404094833656](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304041440148.png)

### column-gap 属性和 row-gap属性

column-gap 属性控制列间距，row-gap 属性控制行间距。

```css {15,17}
.wrapper {
  width: 860px;
  height: 500px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  grid-template-columns: 200px 200px 200px;
  /* 设置行高，行数为1，超出的行数将平分剩余容器的高度 */
  grid-template-rows: 200px;
  /* 设置列间距 */
  column-gap: 20px;
  /* 设置行间距 */
  row-gap: 5px;
}
```

效果如下：

![image-20230404101126402](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304041440983.png)

### repeat() 函数

repeat() 函数可以简化 grid-template-columns 属性和grid-template-rows 属性的重复值。

该函数有两个参数，第一个参数是重复的列数（或行数），第二个参数是重复值。

```css {13}
.wrapper {
  width: 860px;
  height: 500px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  /* grid-template-columns: 200px 200px 200px; */
  /* 使用repeat()函数简化重复值 */
  grid-template-columns: repeat(3, 200px);
  /* 设置行高，行数为1，超出的行数将平分剩余容器的高度 */
  grid-template-rows: 200px;
  /* 设置列间距 */
  column-gap: 20px;
  /* 设置行间距 */
  row-gap: 5px;
}
```

### auto-fill 关键字

auto-fill 关键字表示自动填充，让一列（或一行）尽可能的容纳更多的项目。

```css {15}
.wrapper {
  width: 70%;
  height: 500px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  /* grid-template-columns: 200px 200px 200px; */
  /* 使用repeat()函数简化重复值 */
  /* grid-template-columns: repeat(3, 200px); */
  /* 使用auto-fill关键字，列数不固定，将根据容器的宽度自动填充 */
  grid-template-columns: repeat(auto-fill, 200px);
  /* 设置行高，行数为1，超出的元素将平分剩余容器的高度 */
  grid-template-rows: 200px;
  /* 设置列间距 */
  column-gap: 20px;
  /* 设置行间距 */
  row-gap: 5px;
}
```

效果如下：

![](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304041458696.gif)



## grid布局与flex布局的区别

grid 布局是二维布局，可以控制多行多列。而flex 布局是一维布局，它只能控制一行或者一列。
