# \<script setup>

`<script setup>`是 Vue3 使用 Composition API 的编译时语法糖，相比于普通的`<script>`语法，它具有更多的优势：

- 更少的样板内容，更简洁的代码
- 能够使用纯 TypeScript 声明 props 和自定义事件
- 更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)
- 更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)



## 基本语法

在`<script>`代码块上添加 setup 属性即可。

```vue
<script setup>
console.log('hello script setup');
</script>
```

`<script setup>`中的代码会在**每次组件实例被创建的时候执行**。

### 各种声明会自动暴露给模板

在 `<script setup>` 各种声明 (包括变量，函数声明，以及 import 导入的内容) 都能在模板中直接使用：

```vue
<script setup>
import { capitalize } from './helpers'
const msg = 'Hello!'
function log() {
  console.log(msg);
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## 核心 API

### 使用 props 和 emit

在`<script setup>` 直接使用 defineProps 和 defineEmits API，传入与 props 和 emits 选项相同的值即可。

```vue
<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
  foo: String,
  bar: {
    type: String,
    required: true
  }
});
console.log(props.foo, props.bar);

const emit = defineEmits(['change', 'delete']);
onMounted(() => {
  emit('change');
})
</script>
```

defineProps 和 defineEmits API 被称为**宏**，它们不需要导入，并且会跟`<script setup>`一样在编译过程就会被处理掉。

### 使用 slots 和 attrs

slots 和 attrs 一般常用于模板中，通过 $slots 和 $attrs 访问即可。如果需要在`<script setup>`中使用的话，可以通过 useSlots 和 use Attrs 两个辅助函数。

```vue
<script setup>
import { useSlots, useAttrs } from 'vue';

const slots = useSlots();
const attrs = useAttrs();
</script>
```



## defineExpose()

通常情况下，我们是非常不建议通过 $ref 去