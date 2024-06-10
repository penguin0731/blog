# 【ES6+】Symbol

Symbol 是 ES6 新增的一种基本数据类型，通过使用`Symbol()`函数来创建。

Symbol 设计的初衷就是为了给对象添加私有属性。

## 特点

- 没有字面量
- typeof 的类型是`symbol`
- 每个 Symbol() 返回的 symbol 都是唯一的
- Symbol 不是构造函数，`new Symbol()`会报错
- Symbol 可以作为对象的属性，起到私有属性的作用，这种属性叫做符号属性
  - 符号属性不能被枚举，所以 `for...in...` 和 `Object.keys` 无法读取符号属性
  - 尽管 `Object.getOwnPropertyNames` 可以读取不可枚举的属性，但还是无法读取到符号属性
  - ES6 新增的 `Object.getOwnPropertySymbols` 可以读取
- Symbol 无法被隐式转换，因此不能用于数学运算、字符串拼接或其他隐式转换场景，但可以显示转换为字符串，使用 String 构造函数转换即可，`console.log` 方法之所以能够输出就是因为内部进行了显示转换

