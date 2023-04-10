---
sidebarDepth: 2
---
# grid布局

grid 布局，又称为网格布局。

采用 grid 布局的元素，我们称为 grid 容器，简称“容器”。它的直接子元素则称为 grid 项目，简称"项目"。

grid 布局是二维布局，它有“行”和“列”的概念，形成一个个的网格，项目占据多少个网格，占据哪些位置的网格都可以由我们定义。

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
  <div class="item one">One</div>
  <div class="item two">Two</div>
  <div class="item three">Three</div>
  <div class="item four">Four</div>
  <div class="item five">Five</div>
  <div class="item six">Six</div>
  <div class="item seven">Seven</div>
  <div class="item eight">Eight</div>
</div>
```

```css {11,13}
.wrapper {
  width: 70%;
  height: 300px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  grid-template-columns: 200px 200px 200px;
  /* 设置行高，行数为1，超出的元素将平分剩余容器的高度 */
  grid-template-rows: 200px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  color: #fff;
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

.seven {
  background-color: #BEEDC7;
}

.eight {
  background-color: #F4606C;
}
```

效果如下：

![image-20230407111449193](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071114302.png)



### column-gap 属性、row-gap 属性和 gap 属性

column-gap 属性控制列间距，row-gap 属性控制行间距。

gap 属性是这两个属性的简写，`gap: <row-gap> <column-gap>`

```css {15,17,19}
.wrapper {
  width: 70%;
  height: 300px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  grid-template-columns: 200px 200px 200px;
  /* 设置行高，行数为1，超出的元素将平分剩余容器的高度 */
  grid-template-rows: 100px;
  /* 设置列间距 */
  /* column-gap: 10px; */
  /* 设置行间距 */
  /* row-gap: 20px; */
  /* 设置行间距20px，列间距10px */
  gap: 20px 10px;
}
```

效果如下：

![image-20230407111752412](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071117461.png)



::: warning grid-gap 属性和 gap 属性有什么区别？ 

grid-gap 属性是 grid 布局特有的属性，而 gap 属性是一个通用属性，适用于任何布局模式，如 grid、flex 和多列布局等。

推荐使用 gap 属性，因为 gap 属性比较通用，在多个布局模式之间切换也更加方便。

:::



### repeat() 函数

repeat() 函数可以简化 grid-template-columns 属性和grid-template-rows 属性的重复值。

该函数有两个参数，第一个参数是重复的列数（或行数），第二个参数是重复值。

```css {11}
.wrapper {
  width: 70%;
  height: 300px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 使用repeat()函数简化重复值 */
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: 100px;
  /* 设置行间距20px，列间距10px */
  gap: 20px 10px;
}
```

### auto-fill 关键字

auto-fill 关键字表示自动填充，让一行（或一列）尽可能的容纳更多的项目。

```css {11}
.wrapper {
  width: 70%;
  height: 300px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 使用auto-fill关键字，列数不固定，将根据容器的宽度自动填充 */
  grid-template-columns: repeat(auto-fill, 200px);
  /* 设置行高，行数为1，超出的元素将平分剩余容器的高度 */
  grid-template-rows: 200px;
  /* 设置行间距20px，列间距10px */
  gap: 20px 10px;
}
```

效果如下：

![grid布局-auto-fill](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071436436.gif)



### fr 关键字

fr 关键字是 grid 布局中的一种长度单位，表示网格容器中剩余空间的一部分。

一般情况下，`1fr`表示“剩余空间的100%”，`.25fr`表示“剩余空间的25%”。当 fr 大于1时，则会重新计算分配比例。

```css {11}
.wrapper {
  width: 70%;
  height: 300px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置第一列的列宽为200px，设置第二第三列均为剩余空间的40% */
  grid-template-columns: 200px repeat(2, .4fr);
  /* 设置行高，行数为1，超出的元素将平分剩余容器的高度 */
  grid-template-rows: 200px;
  /* 设置行间距20px，列间距10px */
  gap: 20px 10px;
}
```

效果如下：

![grid布局-fr](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071437426.gif)



### grid-template-area 属性

grid-template-area 属性用于定义区域，一个区域由一个或多个网格组成。

这个属性一般与项目属性中的 grid-area 属性配合使用。

```css {17-22}
.wrapper {
  width: 70%;
  height: 500px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置第一列的列宽为200px，设置第二第三列均为剩余空间的40% */
  grid-template-columns: repeat(5, 1fr);
  /* 设置行高，行数为1，超出的元素将平分剩余容器的高度 */
  grid-template-rows: repeat(5, 1fr);
  /* 行列间距10px */
  gap: 10px;
  /* 定义区域 */
  grid-template-areas: 
      "one   two   two   three four"
      "five  two   two   three four"
      "five  six   seven three four"
      ".     six   seven nine  four"
      "eight eight seven nine  four";
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  color: #fff;
}

.one {
  background-color: #19CAAD;
  grid-area: one;
}

.two {
  background-color: #8CC7B5;
  grid-area: two;
}

.three {
  background-color: #D1BA74;
  grid-area: three;
}

.four {
  background-color: #BEE7E9;
  grid-area: four;
}

.five {
  background-color: #E6CEAC;
  grid-area: five;
}

.six {
  background-color: #ECAD9E;
  grid-area: six;
}

.seven {
  background-color: #BEEDC7;
  grid-area: seven;
}

.eight {
  background-color: #F4606C;
  grid-area: eight;
}

.nine {
  background-color: #A0EEE1;
  grid-area: nine;
}
```

上述定义区域的代码中，`.`符号表示该单元格没有项目占用，即该单元格为空。

效果如下：

![image-20230407145152810](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071451869.png)

### grid-auto-columns 属性和 grid-auto-rows 属性

在介绍这两个属性前，先引入两个概念，**显式网格**和**隐式网格**。

显式网格指的是我们在 grid-template-rows 属性和 grid-template-columns 属性中定义的行和列。如果项目的数量超过了我们定义的网格，或者是我们在定义好的网格之外放置来其他项目，那么网格容器会自动创建隐式网格来容纳剩余的项目。

gird-auto-rows 属性和 grid-auto-columns 属性就是用于定义隐式网格的行高和列宽的。

```css {16}
.wrapper {
  width: 70%;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  grid-template-columns: 200px 200px 200px;
  /* 设置行高，行数为1 */
  grid-template-rows: 100px;
  /* 行列间距为10px */
  gap: 10px;
  /* 超出第一行的元素，将占用50px的行高 */
  grid-auto-rows: 50px;
}
```

效果如下：

![image-20230407145554618](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071455692.png)

一般情况下，grid-auto-columns 属性相对 grid-auto-rows 属性来说使用的较少，但当我们指定一个项目占据新的一列时，或许会用的上。

```css {16,18}
.wrapper {
  width: 70%;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  grid-template-columns: 200px 200px 200px;
  /* 设置行高，行数为1 */
  grid-template-rows: 100px;
  /* 行列间距为10px */
  gap: 10px;
  /* 超出第一行的元素，将占用50px的行高 */
  grid-auto-rows: 50px;
  /* 超出第三列的元素，将占用100px的列宽 */
  grid-auto-columns: 100px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  color: #fff;
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
  /* 指定该项目占据的列的起始位置 */
  grid-column-start: 4;
  /* 指定该项目占据的列的结束位置 */
  grid-column-end: 5;
}

.five {
  background-color: #E6CEAC;
}

.six {
  background-color: #ECAD9E;
}

.seven {
  background-color: #BEEDC7;
}

.eight {
  background-color: #F4606C;
}

.nine {
  background-color: #A0EEE1;
}
```

效果如下：

![image-20230407145440654](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071455276.png)

### grid-auto-flow 属性

grid-auto-flow 属性控制着网格的自动布局算法，默认值是`row`，即**先行后列**。

```css {17}
.wrapper {
  width: 70%;
  height: 500px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  grid-template-columns: 200px 300px 200px;
  /* 行列间距10px */
  gap: 10px;
  /* 设置隐式网格的行高为100px */
  grid-auto-rows: 100px;
  /* 默认先行后列 */
  grid-auto-flow: row;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  color: #fff;
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
  grid-column-start: 1;
  grid-column-end: 3;
}

.seven {
  background-color: #BEEDC7;
}

.eight {
  background-color: #F4606C;
}

.nine {
  background-color: #A0EEE1;
}
```

效果如下：

![image-20230407160751441](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071607480.png)

我们可以看到第二行的最后有一块空白，这是因为第六个项目的长度大于空白的长度，因此第六个项目被挤到了下一行。在实际的场景中，我们也许需要尽可能的填满网格，这个时候我们可以将值设成`row dense`，表示网格布局按先行后列的布局算法自动排列，并且当后面有较小的元素时，会试图去填满前面的空白，当然这也会打乱项目原来的顺序。

```css {17}
.wrapper {
  width: 70%;
  height: 500px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置列宽，列数为3，超出的元素会自动换行 */
  grid-template-columns: 200px 300px 200px;
  /* 行列间距10px */
  gap: 10px;
  /* 设置隐式网格的行高为100px */
  grid-auto-rows: 100px;
  /* 先行后列，尽可能填满网格 */
  grid-auto-flow: row dense;
}
```

效果如下：

![image-20230407164955637](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071649698.png)

同样的，也可以将值设成`column`，即**先列后行**。

```css {17}
.wrapper {
  width: 70%;
  height: 300px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 设置行高100px，行数为2 */
  grid-template-rows: 100px 100px;
  /* 设置隐式网格的列宽为150px */
  grid-auto-columns: 150px;
  /* 行列间距10px */
  gap: 10px;
  /* 先列后行 */
  grid-auto-flow: column;
}
```

效果如下：

![image-20230407170418075](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304071704143.png)

### justify-items 属性和 align-items 属性

justify-items 属性控制网格中内容的水平位置，align-items 属性控制网格中内容的垂直位置。

这两个属性的取值相同：

```css
justify-items: start | center | end | stretch;
align-items: start | center | end | stretch;
```

以 justify-items 属性为例：

```css {16}
.wrapper {
  width: 70%;
  height: 300px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 使用repeat()函数简化重复值 */
  grid-template-columns: repeat(3, 200px);
  /* 设置行高，行数为1，超出的元素将平分剩余容器的高度 */
  grid-template-rows: 100px;
  /* 行间距20px，列间距10px */
  gap: 20px 10px;
  justify-items: start;
}
```

效果如下：

- start：对齐网格起始位置边缘

![image-20230410145631872](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101456016.png)

- center：网格内容居中

![image-20230410145911087](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101459143.png)

- end：对齐网格结束位置边缘

![image-20230410145946943](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101459987.png)

- stretch：拉伸，占满网格的整个宽度（默认值）

![image-20230410150020408](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101500452.png)



### justify-content 属性和 align-content 属性

justify-content 属性控制整个内容区域在 grid 容器中的水平位置，align-content 属性控制整个内容区域在 grid 容器中的垂直位置。

这两个属性的取值相同：

```css
justify-content: start | center | end | stretch | space-around | space-between | space-evenly;
align-content: start | center | end | stretch | space-around | space-between | space-evenly;
```

以 justify-items 属性为例：

```css {14}
.wrapper {
  width: 70%;
  height: 300px;
  margin: 100px auto;
  border: 2px solid black;
  padding: 10px;

  /* 设置元素为网格容器 */
  display: grid;
  /* 使用repeat()函数简化重复值 */
  grid-template-columns: repeat(3, 200px);
  /* 设置行高，行数为1，超出的元素将平分剩余容器的高度 */
  grid-template-rows: 100px;
  justify-content: start;
}
```

效果如下：

- start：内容区域对齐容器的起始位置边缘

![image-20230410151053681](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101510725.png)

- center：内容区域在容器的居中位置

![image-20230410151124283](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101511329.png)

- end：内容区域对齐容器的结束位置边缘

![image-20230410151148002](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101511043.png)

- stretch：项目没有指定大小时，拉伸占满整个网格

![](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101512259.png)

- space-around：内容区域与容器两边的间隔相等，并且这个间隔是项目之间原间隔的二分之一

![image-20230410151522254](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101515327.png)

- space-between：内容区域与容器两边没有间隔，项目之间原间隔相等

![image-20230410151934234](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101519284.png)

- space-evenly：内容区域与容器两边的间隔，和项目之间的原间隔相等

![image-20230410152203473](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202304101522519.png)

::: warning 注意

项目之间的间隔会受 gap 属性设置的行高或列宽影响。

项目的总间隔 = 属性值（space-around、space-between、space-evenly）分配的原间隔 + gap属性的行高或列宽

:::



## 项目属性

### grid-area 属性







## grid布局与flex布局的区别

grid 布局是二维布局，可以控制多行多列。而flex 布局是一维布局，它只能控制一行或者一列。
