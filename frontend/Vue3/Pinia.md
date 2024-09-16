# Pinia

Pinia 是 Vue 的一个状态管理库，现在 Vue 官方已经推荐使用 Pinia 来代替 Vuex，我们可以将 Pinia 理解为 Vuex 的最新版。

Pinia 的三个核心概念：state、getter 和 actions，可以简单的理解为 Vue 中 Option API 的 data、computed 和 methods。



## 优势

对比 Vuex 3.x/4.x，Pinia 具有以下优势：

- mutations 不复存在，只有 state、getter 和 actions
- actions 支持同步异步修改 state 状态，相当于 mutations 和 actions 合并了

- 不再有 modules 的嵌套结构和命名空间，每个 Store 实例都是独立的
- 足够轻量，压缩后的体积只有1.6kb
- 支持 TypeScript
- 支持插件扩展

