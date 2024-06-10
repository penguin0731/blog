# 【ES6+】新增的Object API

## Object.is

用于判断两个数据是否相同，与`===`基本一致，但有两点不同：

- NaN等于自身
- +0不等于-0

```js
console.log(NaN === NaN); // false
console.log(+0 === -0); // true

Object.is(NaN, NaN); // true
Object.is(+0, -0); // false
```

## Object.assign

用于合并对象，将源对象（source）中可枚举的属性，复制到目标对象中（target），如果有同名属性，则后面的属性会覆盖前面的属性。

```js
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
console.log(target); // { a:1, b:2, c:3 }

// Object.assign方法实现的是浅克隆
var obj1 = {a: { b: 1 }};
var obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
console.log(obj2.a.b); // 2
```

## Object.keys

ES5引入了Object.keys方法，返回一个数组，数组成员是对象中可遍历的属性名，不包含Symbol属性和原型链中的属性名。

```js
var obj = { foo: 'bar', baz: 42, [Symbol()]: 'symbol' };
Object.keys(obj); // ["foo", "baz"]
```

## Object.values

ES2017引入了Object.values方法，返回一个数组，数组成员是对象中可遍历的属性值，不包含Symbol属性和原型链中的属性值。

```js
var obj = { foo: 'bar', baz: 42, [Symbol()]: 'symbol' };
Object.values(obj); // ["bar", 42]
```

## Object.entries

ES2017引入了Object.entries方法，返回一个二维数组，数组成员是对象中遍历的属性名和属性值，不包含Symbol属性和原型链中的属性名和属性值。

```js
var obj = { foo: 'bar', baz: 42, [Symbol()]: 'symbol' };
Object.entries(obj); // [["foo", "bar"], ["baz", 42]]
```

通常配合for...of来遍历对象属性。

```js
for(var [k, v] of Object.entries(obj)) {
    console.log(k, v);
}
```

另一个用法是将对象转换为Map结构。

```js
var map = new Map(Object.entries(obj));
```

## Object.fromEntries

ES2019引入了Object.fromEntries方法，该方法是Object.entries的逆操作，将一个键值对数组转换为对象。

```js
var kvArr = [['foo', 'bar'], ['baz', 42]];
var obj = Object.fromEntries(kvArr); // { foo: "bar", baz: 42 }
```

该方法常用于将Map结构转换为对象。

```js
const map = new Map().set('foo', true).set('bar', false);
var obj = Object.fromEntries(map); // { foo: true, bar: false }
```

## Object.setPrototypeOf

它的作用和`__proto__`一样，用于给对象设置原型对象，返回对象本身，但是`__proto__`不属于web标准，实际上`__proto__`是各大浏览器产商实现的，因此我们推荐使用Objet.setPrototypeOf。

```js
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);
proto.y = 20;
console.log(obj.x); // 10
console.log(obj.y); // 20
```

## Object.getPrototypeOf

用于获取对象的原型对象。

```js
function Person() {};
var p = new Peroson();
console.log(Object.getPrototypeOf(p) === Peroson.prototype); // true
```


