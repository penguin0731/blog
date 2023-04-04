# Vue的长列表优化

假设有这样一个场景问题：前端需要渲染十万条数据且不能分页。

我们可以看看，在不使用任何优化的前提下，直接将十万条数据渲染出来需要多长时间？

```vue
<template>
	<div id="app">
        <div class="container">
            <div class="list">
                <div v-for="item in list" :key="item.id" class="item">
                    <span>{{ item.content }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let list = [];
for(let i = 1; i <= 100000; i++) {
    list.push({
        id: i,
        content: `this is item${i}`
    });
}
    
export default {
    data() {
        return {
            list,
        }
    }
}
</script>

<style>
.container {
	width: 500px;
    height: 520px;
    margin: 20px auto 0;
}
.item {
	text-align: center;
    height: 52px;
    line-height: 52px;
    box-sizing: border-box;
    border-bottom: 1px solid;
}
</style>
```

通过控制台的Performance工具，我们可以对页面进行性能分析。这里我们主要看性能概览，如下图：

![image-20220624205242626](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220624205242626.png)

我们先排除脚本运行的时间，因为我们需要时间遍历生成数据。可以看到，渲染页面花费了4.6s左右，而这还是建立在我们渲染列表的DOM结构简单的情况下，如果是在正常的业务场景里，可以想象渲染页面将要耗费大量的时间。

那么我们需要如何优化呢？常见的优化方案有三种：

- 懒加载
- 时间切片
- 虚拟列表

懒加载其实就是另一种意义上的分页，时间切片是通过createDocumentFragment + requestAnimationFrame将DOM分批插入文档，这种方案适合列表结构简单的情况，当列表结构比较复杂时，我们通常使用虚拟列表来解决。

## 什么是虚拟列表？

虚拟列表就是只对**可视区域**进行渲染的一种实现，对**不可视区域**中的数据则不渲染或只渲染部分，从而达到极高的渲染性能。

代入到上面的场景问题，我们只需要在可视区域渲染十万条数据中的几十条数据即可，这样页面的渲染性能能够得到大幅的提升。

## 虚拟列表的实现

虚拟列表实现的核心就是对可视区域中的列表项使用绝对定位，并通过监听滚动事件计算得出可视区域中列表项的偏移量。

在实现的过程中有两种情况：

- 长列表的每一项高度已知且固定
- 长列表的每一项高度未知且不固定

我们实现的是第一种，第二种情况的计算量会比较多，对性能会有一定的消耗。

假设长列表的每项高度固定`52px`，可视区域能够展示10条数据，那么可视区域的高度为`520px`。在首次渲染的时候，我们只需要渲染10条数据即可。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220624214803626.png" alt="image-20220624214803626"  />

假设页面发生滚动，滚动条距离顶部`200px`，我们可以根据列表项的高度计算得到可视区域的起始数据索引为`200 / 52 = 3.846`，即使只有一半在可视区域也同样需要渲染，但由于是起始数据，并且索引必须是整数，因此我们需要对结果进行向下取整，最终得到可视区域的起始数据索引实际为3。同理，通过计算得出可视区域的结束数据索引实际为14，注意结束数据索引是向上取整。这样一来我们就可以通过这两个索引将长列表切割得到可视区域的列表数据。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220624224405042.png" alt="image-20220624224405042"  />

整理一下上述的分析，我们需要得到的数据如下：

- 可视区域起始数据索引`startIndex`
- 可视区域结束数据索引`endIndex`
- 可视区域列表数据及每项的偏移量

完整的代码实现如下：

```vue
<!-- RecycleScroller.vue -->
<template>
  <div ref="container" class="recycle-scroller-container" @scroll="setPool">
    <div
      class="recycle-scroller-list"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        v-for="poolItem in pool"
        :key="poolItem.item[keyField]"
        class="recycle-scroller-item"
        :style="{ transform: `translateY(${poolItem.position}px)` }"
      >
        <slot :item="poolItem.item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
let prev = 5; // 不可视区域上部分渲染的数据量
let next = 5; // 不可视区域下部分渲染的数据量
export default {
  props: {
    // 长列表数据
    list: {
      type: Array,
      default: () => [],
    },
    // 列表项的高度
    itemHeight: {
      type: Number,
      default: 0,
    },
    // 列表项中具有唯一标识的属性
    keyField: {
      type: String,
      default: "id",
    },
  },
  data() {
    return {
      pool: [], // 可视区域的列表数据
    };
  },
  mounted() {
    this.setPool();
  },
  computed: {
    // 长列表的总高度
    totalHeight() {
      return this.list.length * this.itemHeight;
    },
  },
  methods: {
    // 更新可视区域的列表数据
    setPool() {
      // 滚动距离
      let scrollTop = this.$refs.container.scrollTop;
      // 可视区域的高度
      let clientHeight = this.$refs.container.clientHeight;
      // 起始数据索引
      let startIdx = Math.floor(scrollTop / this.itemHeight);
      // 结束数据索引
      let endIdx = Math.ceil((scrollTop + clientHeight) / this.itemHeight);

      // 为了避免快速滑动造成的白屏，我们可以设置一下不可视区域渲染部分数据
      startIdx -= prev;
      startIdx < 0 && (startIdx = 0);
      endIdx += next;

      // 切割得到可视区域的列表数据
      this.pool = this.list.slice(startIdx, endIdx).map((item, index) => {
        return {
          item, // 列表项数据
          position: this.itemHeight * (startIdx + index), // 列表项的偏移量
        };
      });
    },
  },
};
</script>

<style scoped>
.recycle-scroller-container {
  overflow: auto;
}
.recycle-scroller-list {
  position: relative;
}
.recycle-scroller-item {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
```

```vue
<!-- ListItem.vue -->
<template>
  <div class="list-item">
    <span>{{ item.content }}</span>
  </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style>
.list-item {
    text-align: center;
    height: 52px;
    line-height: 52px;
    box-sizing: border-box;
    border-bottom: 1px solid;
}
</style>
```

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <RecycleScroller class="scroll" :list="list" :itemHeight="52" v-slot="{ item }">
      <list-item :item="item" />
    </RecycleScroller>
  </div>
</template>

<script>
import ListItem from "./components/ListItem.vue";
import RecycleScroller from "./components/RecycleScroller.vue";

let list = [];
for (let i = 1; i <= 100000; i++) {
  list.push({
    id: i,
    content: `this is item${i}!`,
  });
}

export default {
  name: "App",
  components: {
    RecycleScroller,
    ListItem,
  },
  data() {
    return {
      list,
    };
  },
};
</script>

<style>
.scroll {
  margin: 30px auto 0;
  width: 500px;
  height: 520px;
}
</style>
```

## 最终效果

![image-20220624232715326](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220624232715326.png)

可以看到使用虚拟列表之后，渲染时间只需要10ms，对于性能的提升非常巨大，因此虚拟列表算是长列表优化中的最优方案了。这个方案同样适用于虚拟表格，感兴趣的朋友可以尝试自己实现一下。

最后在这里推荐一个库：[vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller#readme)，我们上面的代码其实就是在实现这个库的简易版。

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>
