# Intersection Observer

Intersection Observer API 用于观察目标元素与其祖先元素或视口的交叉状态。

## 用法

通过 IntersectionObserver 构造函数来创建观察实例，IntersectionObserver 接收两个参数：

第一个参数是回调函数，在触发交叉状态时执行，回调函数接收一个参数 entries，它是一个数组对象，表示观察实例监听到的所有目标，其中需要关注两个字段 isIntersecting 和 target，分别表示是否发生交叉和对应的目标元素。

第二个参数是一个配置对象，配置如下：

- root：接收dom，与目标元素发生交叉的元素，如果值是null，则默认将整个文档作为视口
- rootMargin：对root元素的影响范围扩散或收缩
- **thresholds：**目标元素与root元素交叉的阈值，取值范围0-1

```js
const ob = new IntersectionObserver((entries) => {
  console.log('交叉了', entries);
}, {
  root: null,
  rootMargin: "10px",
  thresholds: 0,
});

const imgs = document.querySelectorAll('img');
imgs.forEach(img => {
  ob.observe(img);
});
```

