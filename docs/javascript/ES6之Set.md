# Set

## Set

特点：只有属性值，成员唯一

用途：可以转成数组，其本身具备去重、交集、并集、差集的作用

::: warning 注意

1. Set内部使用Object.is方法来判断两个数据是否相同，但针对+0和-0，Set判断为相同
2. Set集合中不存在下标，下标数组是独有的，所以Set集合的forEach方法里的index参数不是下标，而是集合的每一项
3. Set集合中的size属性是获取Set集合的长度，只读属性，无法赋值

:::

```js
var arr = [1, 2, 3, 4];
var s = new Set(arr);

// 常用方法
// add 返回新增后的set实例
s.add(5); // Set [1, 2, 3, 4, 5]

// has 目标是否存在set
s.has(5); // true

// delete 在delete前会调用has方法并返回
s.delete(5); // true
s.delete(9); // false

// forEach 遍历
s.forEach((item, index, self) => {
    console.log(item, index, self); // 1 1 [1, 2, 3, 4]
});

// clear 清空所有元素
s.clear();

// Set转数组
Array.from(s);
[...s]

var arr1 = [1, 2, 3];
var arr2 = [3, 4, 5];
var s1 = new Set(arr1);
var s2 = new Set(arr2);
// 并集
var union = new Set([...arr1, ...arr2]);
// 交集
var intersection = arr1.filter(item => s2.has(item));
// 差集
var newArr1 = arr1.filter(item => !s2.has(item));
var newArr2 = arr2.filter(item => !s1.has(item));
var diffset = [...newArr1, ...newArr2];
```

## WeakSet

WeakSet可以实现与Set一样的功能，不同的是：

- 它只能存储引用值，存储数组时，数组的成员也必须是引用值
- 它内部存储的引用地址，不受[垃圾回收机制](../浏览器/垃圾回收机制.md)影响
  - 简单来说，WeakSet中存储的引用值，如果没有被其他变量所引用，那么这些引用值会自动消失

- 不可遍历，没有size属性、forEach等遍历方法

```js
var obj1 = {
    name: 'Tom'
}
var s = new Set();
s.add(obj1);
obj1 = null;
// s和obj1同时指向了引用值，即使obj1置空，该引用值依然能够通过s访问
console.log(s);


var obj2 = {
    name: 'Sam'
}
var ws = new WeakSet();
ws.add(obj2);
obj2 = null;
// ws和obj2同时指向了该引用值，如果obj2变量不再指向该引用值
// 那么垃圾回收机制就会回收该引用值所占的内存，ws也不存在该引用值
console.log(ws);
```

