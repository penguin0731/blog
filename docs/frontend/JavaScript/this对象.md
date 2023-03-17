# this对象

this 对象是在运行时，基于函数的执行环境决定的：

- 全局作用域中的 this 对象指向 window

```javascript
console.log(this); // window
```

- 函数作用域中的 this 对象，取决于函数如何调用

  - 在全局作用域中直接调用函数，this 对象指向 window
  
  ```js
  function test() {
  	console.log(this);
  }
  test(); // window
  ```
  
  - 在对象中，函数作为对象的属性调用，this 对象指向该对象
  
  ```javascript
  var obj = {
  	func: function() {
  		console.log(this);
  	},
  	a: 1
  }
  obj.func(); // { func: f, a: 1 }
  ```
  
  需要注意的是，如果将对象的属性赋值给一个全局变量，再由全局变量来调用，那么 this 对象指向 window。
  
  ```javascript
  var obj = {
  	func: function() {
  		console.log(this);
  	},
  	a: 1
  }
  var f = obj.func;
  // 此时调用函数的是全局变量f，而不再是obj.func
  f(); // window
  ```
  
  - 通过 new 关键字调用构造函数，this 对象指向构造函数的对象实例
  
  ```js
  function Person(name, age) {
  	this.name = name;
  	this.age = age;
  }
  
  var jack = new Person('jack', 18); // { name: 'jack', age: 18 }
  ```

另外我们也可以通过函数原型上的 call、bind、apply 方法来手动的改变 this 指向。

  <Vssue 
      :options="{ labels: [$page.relativePath.split('/')[0]] }" 
      :title="$page.relativePath.split('/')[1]" 
  />
