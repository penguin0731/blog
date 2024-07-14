# 从 TypeScript 到 ArkTS 的适配规则

ArkTS 基于 TypeScript 做了进一步的扩展，我们可以理解为 ArkTS 是更加严格的 TypeScript。

官方文档：[从TypeScript到ArkTS的适配规则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/typescript-to-arkts-migration-guide-V5)

这里主要罗列一些在日常开发中，比较常见的且需要注意的写法。

## 强制使用静态类型

禁止使用 any 和 unknown。

```tsx
// 不支持：
let res: any = some_api_function('hello', 'world');
// `res`是什么？错误代码的数字？字符串？对象？
// 该如何处理它？
// 支持：
class CallResult {
  public succeeded(): boolean { ... }
  public errorMessage(): string { ... }
}

let res: CallResult = some_api_function('hello', 'world');
if (!res.succeeded()) {
  console.log('Call failed: ' + res.errorMessage());
}
```

## 不支持结构化类型（structural typing）

两个不相关的类（即没有继承关系或没有 implements 相同的接口），具有相同的成员，它们不能够互相赋值。

```tsx
class User {
	id: number = 1
  name: string = ''
}

class Person {
  id: number = 1
  name: number = ''
}

const u: User = new Person(); // 不支持
```

但上述代码，在 TypeScript 中是允许的，因为 TypeScript 支持结构化类型。



## 不支持联合类型（intersection type）

ArkTS 不支持联合类型，但可以使用继承作为替代方案。

```tsx
interface Identity {
  id: number
  name: string
}

interface Contact {
  email: string
  phoneNumber: string
}

type Employee = Identity & Contact // 不支持

interface Employee extends Identity,  Contact {} // 推荐
```

## 不支持通过索引访问字段

ArkTS 不支持通过索引（obj[field]）访问字段，只能通过点操作符（obj.field）访问字段。

但 ArkTS 可以通过索引访问类型化数组（如 Int32Array）的元素。

```tsx
class Point {
  x: string = ''
  y: string = ''
}
let p: Point = {x: '1', y: '2'};

console.log(p['x']); // 不支持
console.log(p.x); // 推荐
```

## 不支持解构赋值

ArkTS不支持解构赋值。可使用其他替代方法，例如，使用临时变量。

```tsx
let [one, two] = [1, 2];

[one, two] = [two, one]; // 不支持

// 推荐
let tmp = one;
one = two;
two = tmp;
```

