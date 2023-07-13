---
sidebarDepth: 2
---

# flex布局

## 什么是flex布局？

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为 Flex 布局，包括行级元素。

::: warning 注意
设为flex布局以后，子元素的float、clear和vertical-align属性将失效。
:::

```css
element {
    display: flex;
}
```

## 基本概念

采用flex布局的元素，称为flex容器（flex container），简称"容器"。它的直接子元素自动成为容器成员，称为flex项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

![flex1](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/flex1.png)

## 容器的属性

### flex-direction

flex-direction属性决定主轴的方向（即项目的排列方向）

接受以下取值：

`row`：主轴方向从左到右

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208160930382.png" alt="image-20220816092948147"  />

`row-reverse`：主轴方向从右到左

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208160932306.png" alt="image-20220816093217233"  />

`column`：主轴方向从上到下

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161006975.png" alt="image-20220816100652793"  />

`column-reverse`：主轴方向从下到上

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161007641.png" alt="image-20220816100739571"  />

### flex-wrap

flex-wrap属性决定元素是否换行

接受以下取值：

`no-wrap`：元素不换行，可能导致容器溢出

![image-20220407145734823](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407145734823.png)

`wrap`：元素换行

![image-20220407145801257](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407145801257.png)

`wrap-reverse`：和wrap行为一致，只是改变了交叉轴的方向

![image-20220407145832463](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407145832463.png)

### justify-content

justify-content属性定义了项目在**主轴**上的对齐方式

接受以下取值：

`flex-start`：项目位于容器的开头

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161010907.png" alt="image-20220816101018828"  />

`flex-end`：项目位于容器的结尾

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161011804.png" alt="image-20220816101103738"  />

`center`：项目位于容器的中央

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161011356.png" alt="image-20220816101134295"  />

`space-between`：平分容器空间，首尾项目位于容器两侧

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161012723.png" alt="image-20220816101217660"  />

`space-around`：平分容器空间，首尾项目与容器的距离，等于其他相邻容器距离的一半

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161013706.png" alt="image-20220816101331641"  />

### align-items

align-items属性定义项目在**交叉轴**上如何对齐

接收以下取值：

`flex-start`：项目位于容器的开头

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161015731.png" alt="image-20220816101503669"  />

`flex-end`：项目位于容器的结尾

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161015824.png" alt="image-20220816101553741"  />

`center`：项目位于容器的中央

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161016320.png" alt="image-20220816101628252"  />

`baseline`：根据项目的第一行文字的基线对齐

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161020617.png" alt="image-20220816102026502"  />

`stretch`：项目将拉伸覆盖整个容器

::: warning 注意
要使stretch生效，项目在交叉轴上不能有固定尺寸
:::

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202208161021609.png" alt="image-20220816102147554"  />

### align-content

align-content属性定义了多行项目在交叉轴上的对齐方式。如果只有一行项目，该属性不起作用。

接收以下取值：

`flex-start`：项目位于容器的开头

![image-20220407153900775](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407153900775.png)

`flex-end`：项目位于容器的结尾

![image-20220407154712212](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407154712212.png)

`center`：项目位于容器中央

![image-20220407154617341](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407154617341.png)

`space-between`：平分容器空间，首尾项目位于容器两侧

![image-20220407154840927](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407154840927.png)

`space-around`：平分容器空间，首尾项目与容器的距离，等于其他相邻容器距离的一半

![image-20220407154901686](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407154901686.png)

`stretch`：项目将拉伸覆盖整个容器

::: warning 注意
要使stretch生效，项目在交叉轴上不能有固定尺寸
:::

![image-20220407154921445](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407154921445.png)

## 项目的属性

### order

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
    order: 0;
}
```

### align-self

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性，但优先级没有align-content属性高。

接收以下取值：

`auto`

`flex-start`

`flex-end`

`center`

`baseline`

`stretch`

![image-20220407155140867](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407155140867.png)

### flex-grow

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```css
.item {
    flex-grow: 0;
}
```

![image-20220407155447641](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407155447641.png)

```css
.item {
    flex-grow: 1;
}
```

![image-20220407155513548](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407155513548.png)

### flex-shrink

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  /* 空间不足也不压缩项目 */
	flex-shrink: 0;
}
```

![image-20220407161042523](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407161042523.png)



根据上图所示，我们可以大概猜出压缩的公式是这样的，以下是建立在压缩比例相同的情况下：

4个元素总宽加起来超过容器的宽为200 * 4 - 400 = 200px，则每个元素需要压缩200 ÷ 4 = 50px，元素最终的宽为200 - 50 = 150px。

如果每个元素的宽度不同且压缩比例不同，又是如何压缩的呢？

```css
.item {
	flex-shrink: 1;
}

.item:nth-of-type(3) {
	flex-shrink: 3;
}
```

![image-20220407161538176](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407161538176.png)

根据上图所示，压缩比例为1 : 1 : 3，公式如下：

1. 先计算加权值，公式为：各个项目的宽度 * shrink值，即200 * 1 + 200 * 1 + 400 * 3 = 1600px
2. 然后计算每个项目需要压缩的宽度，公式为：每个元素所占权值的比例 * 超出容器的宽度
   1. 计算项目1、2需要压缩的宽度：（200 * 1 ÷ 1600）*（200 * 2 + 400）= 25px
   2. 计算项目3需要压缩的宽度：（400 * 3 ÷ 1600）*（200 * 2 + 400）= 150px
3. 最后得出项目压缩后的宽度分别为175px、175px、250px

::: warning 注意
当每个项目变为border-box，且有border或者padding时，元素的压缩会出现精度不准的问题。
:::

```css
.item {
	flex-shrink: 1;
	box-sizing: border-box;
	padding-left: 50px;
	padding-right: 50px;
}

.item:nth-of-type(3) {
	flex-shrink: 3;
}
```

![image-20220407164608880](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407164608880.png)

并且随着border或padding的增大，这个精度差也越来越大。当border或padding占满整个元素时，此时内容区宽高为0，可以发现，只有没设置border或padding的元素3进行了压缩。

![image-20220407165037862](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407165037862.png)

我们猜测，项目1、2并没有参与到加权值的计算当中

由此推测出

**计算加权值的公式实际应为：各个元素的内容区宽度 * shrink值再相加**

现进行验证：

将所有元素的padding左右各设为80px，此时项目1、2内容区宽为40px，元素3的内容区宽为240px，压缩比例为1 : 1 : 3，所有元素总宽超出容器200px

计算加权值： 40 * 1 + 40 * 1 + 240 * 3  =  800px

项目1、2需要压缩的宽度为： （40 * 1）/（800 * 200） =  10px

项目3需要压缩的宽度为： （240 * 3）/（800 * 200）=  180px

因此，经过压缩后，

项目1、2的现宽为： 200 - 10 = 190px

项目3的现宽为： 400 - 180 = 220px

验证成功！

![image-20220407165623036](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220407165623036.png)

### flex-basis

flex-basis属性定义了项目在容器中的初始宽度，默认为auto，即项目本身的宽度，也可以设置长度单位或百分比。

### flex

flex是以下属性的简写

- flex-grow
- flex-shrink
- flex-basis

```css
/* 默认值 */
flex: 0 1 auto;

/* 一个值, 无单位数字: flex-grow */
flex: 2;

/* 一个值, width/height: flex-basis */
flex: 10em;
flex: 30px;
flex: min-content;

/* 两个值: flex-grow | flex-basis */
flex: 1 30px;

/* 两个值: flex-grow | flex-shrink */
flex: 2 2;

/* 三个值: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>