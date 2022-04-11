# Class（类）

## 类的特点

- 类声明不会被提升，与let、const一样，存在临时性死区
- 类中的所有代码均在严格模式下执行
- 类的所有方法都是不可枚举的
- 类的所有方法内部都无法被当做构造函数使用
- 类的构造器必须使用new来调用

## 定义类

```js
class Animal() {
    // 通过#添加私有变量，外部无法访问
    #type = 'animal'
    //静态方法
    //实例无法访问,构造函数才能访问
    static alive(){
        return true;
    }
    //构造方法
    constructor (type, name, age, sex){
        //私有属性
        this.type = type;
        this.name = name;
        this._age = age;
        this.sex = sex;
    }
    //使用getter和setter控制属性
    get age() {
        return this._age;
    }
    set age(age) {
        if(typeof this._age != 'number'){
            throw new TypeError('age property is must be number')
        }
        if(this._age < 0) {
            this._age = 0;
        }else if(this._age > 1000) {
            this._age= 1000;
        }else {
            this._age = age;
        }
    }
    //公有属性 不可枚举
    print(){
        console.log(`【类型】：${this.type}`);
        console.log(`【名字】：${this.name}`);
        console.log(`【年龄】：${this.age}`);
        console.log(`【性别】：${this.sex}`);
    }
}

//等同于

function Animal(type,name,age,sex) {
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
}
Animal.alive = function() {
    return true;
}
Animal.prototype.print = function() {
    console.log(`【类型】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
}
```

## 类的继承

### 关键字

- **extends**：继承，用于类的定义
- **super**
  - 直接当做函数调用，表示父级构造函数
  - 直接当做对象使用，表示父级原型

::: warning 注意

ES6要求，如果定义了constructor并且该类是子类，那么必须在constructor中的第一行手动调用父类构造函数。

:::

如果子类没有定义constructor，则会有默认的构造器，该构造器需要的参数与父类一致并且自动调用父类构造函数。

```js
class Dog extends Animal{
    constructor (name, age, sex){
        super('犬类', name, age, sex)
    }
}
```

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>