# Itertor 迭代器

## 迭代的概念

从一个数据集合中按照顺序，不断的取出的过程。

## 迭代和遍历的区别

迭代强调的是依次取数据，并不保证取多少，也不保证把所有的数据取完。

遍历强调的是要把整个数据依次全部取出。

## 迭代器

对迭代过程的封装，在不同语言中有不同的表现形式，通常为对象，包含 next 方法，next 方法返回下一个数据，并指示迭代是否完成。

## 迭代模式

一种设计模式，用于统一迭代过程，并规范了迭代器规格。

- 迭代器应该具有得到下一个数据的能力

- 迭代器应该具有判断是否还有后续数据的能力



## JavaScript 的迭代器

JavaScript 规定，如果一个对象有 next 方法，并且这个方法返回一个对象，格式如下：

```json
{ "value": xxx, "done": true }
```

那么就可以认为这个对象是迭代器。

- next 方法：获取下一个数据
- 得到的数据
  - value：数据值
  - done：Boolean，是否迭代完成

下面是一个例子：

```js
const arr = [1, 2, 3];

// 我们现在写一个迭代器来迭代 arr

const iterator = {
  index: 0,
  next() {
    return {
      value: arr[this.index++], // 每次取出对应下标的值，并且将下标往后移一位
      done: this.index > arr.length // 当下标超出数组长度，表示已经取完
    }
  }
};

iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: true }
iterator.next(); // { value: undefined, done: true }
```

上述例子中可以看到，我们通过 iterator 就可以将 arr 数组的每一项迭代出来，什么时候开始，什么时候结束，都可以全凭我们来决定，并且不需要再关心 arr 本身，迭代器的作用就是帮我们抽象了取数据的过程，我们关心 iterator 就可以了。

```js
// 使用迭代器，将 arr 的所有数据取出
let data = iterator.next();
while(!data.done) {
  console.log(data.value);
  data = iterator.next();
}
```

如果有多个数组需要迭代，按照上面的写法显然是不可能的，因为耦合度太高，那我们可以封装一个函数去迭代数组。

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [5, 6, 7, 8, 9, 10];

function createIterator(arr) {
  return {
    index: 0,
    next() {
      return {
        value: arr[this.index++],
        done: this.index > arr.length
      }
    }
  }
}

const iterator1 = createIterator(arr1);
const iterator2 = createIterator(arr2);

iterator1.next();
iterator2.next();
```

其他的应用场景，如：

```js
// 依次取出斐波那契数列的第n位

function createFiboIterator() {
  let prev1 = 1, // 当前位置的前一位斐波那契数值
      prev2 = 1, // 当前位置的前两位斐波那契数值
      n = 1; // 当前是第几位
  return {
    next() {
      const result = {
        value: n > 2 ? prev1 + prev2 : 1,
        done: false // 斐波那契数列可以无限延伸
      };
      prev2 = prev1;
      prev1 = result.value;
      n++;
      return result;
    }
  }
}
```



## 迭代协议



