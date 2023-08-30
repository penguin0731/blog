> 2023.07.12

## 问题描述

Element Plus 中的分页组件（el-pagination）在当前页为最后一页，选择较大的每页展示数时，除了触发 size-change 事件，还触发了  current-change  事件。

![](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202307131555805.png)

demo地址：[Element Plus Playground](https://element-plus.run/#eyJzcmMvQXBwLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGVsLXBhZ2luYXRpb24gOmN1cnJlbnQtcGFnZT1cImN1cnJlbnRQYWdlXCIgOnBhZ2Utc2l6ZT1cInBhZ2VTaXplXCIgOnRvdGFsPVwidG90YWxcIiBiYWNrZ3JvdW5kXG4gICAgbGF5b3V0PVwidG90YWwsIHByZXYsIHBhZ2VyLCBuZXh0LCBzaXplc1wiIEB1cGRhdGU6Y3VycmVudC1wYWdlPVwiaGFuZGxlQ2hhbmdlUGFnZVwiXG4gICAgQHVwZGF0ZTpwYWdlLXNpemU9XCJoYW5kbGVDaGFuZ2VTaXplXCIgLz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnO1xuXG5jb25zdCBjdXJyZW50UGFnZSA9IHJlZigxKTtcbmNvbnN0IHBhZ2VTaXplID0gcmVmKDEwKTtcbmNvbnN0IHRvdGFsID0gcmVmKDUwKTtcblxuZnVuY3Rpb24gaGFuZGxlQ2hhbmdlUGFnZSh2YWwpIHtcbiAgY29uc29sZS5sb2coJ+W9k+WJjemhteaVsOaUueWPmOS6hicsIHZhbCk7XG4gIGN1cnJlbnRQYWdlLnZhbHVlID0gdmFsO1xuICBnZXRMaXN0KHZhbCwgcGFnZVNpemUudmFsdWUpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVDaGFuZ2VTaXplKHZhbCkge1xuICBjb25zb2xlLmxvZygn5q+P6aG15bGV56S65pWw5pS55Y+Y5LqGJywgdmFsKTtcbiAgcGFnZVNpemUudmFsdWUgPSB2YWw7XG4gIGdldExpc3QoY3VycmVudFBhZ2UudmFsdWUsIHZhbCk7XG59XG5cbmZ1bmN0aW9uIGdldExpc3QocGFnZSwgc2l6ZSkge1xuICBjb25zb2xlLmxvZyhg6LCD55So5o6l5Y+j5LqGLCBwYWdlOiAke3BhZ2V9LCBzaXplOiAke3NpemV9YCk7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoW3BhZ2UsIHNpemVdKTtcbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge31cbn0iLCJ0c2NvbmZpZy5qc29uIjoie1xuICBcImNvbXBpbGVyT3B0aW9uc1wiOiB7XG4gICAgXCJhbGxvd0pzXCI6IHRydWUsXG4gICAgXCJjaGVja0pzXCI6IHRydWUsXG4gICAgXCJqc3hcIjogXCJwcmVzZXJ2ZVwiLFxuICAgIFwidGFyZ2V0XCI6IFwiRVNOZXh0XCIsXG4gICAgXCJtb2R1bGVcIjogXCJFU05leHRcIixcbiAgICBcIm1vZHVsZVJlc29sdXRpb25cIjogXCJCdW5kbGVyXCIsXG4gICAgXCJhbGxvd0ltcG9ydGluZ1RzRXh0ZW5zaW9uc1wiOiB0cnVlXG4gIH0sXG4gIFwidnVlQ29tcGlsZXJPcHRpb25zXCI6IHtcbiAgICBcInRhcmdldFwiOiAzLjNcbiAgfVxufVxuIiwiX28iOnt9fQ==)

```vue
<template>
  <el-pagination 
    :current-page="currentPage"
   	:page-size="pageSize" 
    :total="total" 
    background
    layout="total, prev, pager, next, sizes" 
    @update:current-page="handleChangePage" 
    @update:page-size="handleChangeSize" 
   />
</template>

<script setup>
import { ref } from 'vue';

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(50);

function handleChangePage(val) {
  console.log('当前页数改变了', val);
  currentPage.value = val;
  getList(val, pageSize.value);
}

function handleChangeSize(val) {
  console.log('每页展示数改变了', val);
  pageSize.value = val;
  getList(currentPage.value, val);
}

function getList(page, size) {
  console.log(`调用接口了, page: ${page}, size: ${size}`);
  return Promise.resolve([page, size]);
}
</script>

```



## 解决过程与方案

我在 github 上找到了对应的 issue，但根据回复，这是属于组件合理的表现，那么只能自己来处理这块逻辑了。

问题的本质是，在每页展示数变大时，触发了 size-change 事件，同时当前页数超过了最大有效页数，分页组件内部修改了当前页数为最大有效页数，从而也触发了 current-change 事件。

知道了原因，那么修改当前页数为最大有效页数这件事我们自己做，就能避免出现问题。

代码如下：

```vue
<template>
  <el-pagination :current-page="currentPage" :page-size="pageSize" :total="total" background
    layout="total, prev, pager, next, sizes" @update:current-page="handleChangePage"
    @update:page-size="handleChangeSize" />
</template>

<script setup>
import { ref, watch } from 'vue';

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(50);

function handleChangePage(val) {
  console.log('当前页数改变了', val);
  currentPage.value = val;
  // getList(val, pageSize.value);
}

function handleChangeSize(val) {
  console.log('每页展示数改变了', val);
  pageSize.value = val;
  // 注意这里要使用val，而不是pageSize.value，因为vue的数据更新是异步的
  // 当前页数超出最大有效页数时，重置当前页数为最大有效页数
  if (currentPage.value * val > total.value) {
    const validPage = Math.ceil(total.value / val);
    currentPage.value = validPage;
  }
  // getList(currentPage.value, val);
}

function getList(page, size) {
  console.log(`调用接口了, page: ${page}, size: ${size}`);
  return Promise.resolve([page, size]);
}

// 为了方便，使用watch一起监听当前页数和每页展示数
watch([currentPage, pageSize], ([newCurrentPage, newPageSize]) => {
  getList(newCurrentPage, newPageSize);
})
</script>

```



## 参考链接

- [\[Component\] [pagination] 切换每页展示数后，会触发了页码的变化 · Issue #10916 · element-plus/element-plus (github.com)](https://github.com/element-plus/element-plus/issues/10916)

