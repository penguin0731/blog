# TS 中的类

我们在使用 TypeScript 书写类的时候，与平时的写法有些许不同。

## 定义属性

```tsx
class User {
  constructor(name: string, age: number) {
    this.name = name;  // 报错
    this.age = age;  // 报错
  }
}
```

当我们在构造函数中定义属性时，会发现报错，这是因为 TypeScript 认为这是在动态的新增属性，而一个对象应该在定义的时候就确定好属性，不应该在后续代码中随意的增加。

那么属性应该如何书写呢？

TypeScript 要求应该使用属性列表来描述。

```tsx
class User {
	name: string
  age: number
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

### 属性的初始化检查

可以在 tsconfig.json 中，配置 `strictPropertyInitialization: true`

### 属性的初始化位置

1. 在构造函数中
2. 属性列表的默认值

```tsx
class User {
	name: string
  age: number
  gender: '男' | '女' = '男'
  
  constructor(name: string, age: number, gender: '男' | '女' = '男') {
    this.name = name;
    this.age = age;
  }
}
```

### 可选属性

```tsx
class User {
	name: string
  age: number
  gender: '男' | '女' = '男'
  pid?: string
  
  constructor(name: string, age: number, gender: '男' | '女' = '男') {
    this.name = name;
    this.age = age;
  }
}
```

### 只读属性

```tsx
class User {
	readonly id: number
	name: string
  age: number
  gender: '男' | '女' = '男'
  pid?: string
  
  constructor(name: string, age: number, gender: '男' | '女' = '男') {
    this.id = Math.random();
    this.name = name;
    this.age = age;
  }
}
```

### 私有成员

```tsx
class User {
	readonly id: number
	name: string
  age: number
  gender: '男' | '女' = '男'
  pid?: string
  private publishNumber: number = 3
  
  constructor(name: string, age: number, gender: '男' | '女' = '男') {
    this.id = Math.random();
    this.name = name;
    this.age = age;
  }
}
```



## 抽象类

### 关键字

- **abstract**：抽象，用于定义类、属性、方法，当子类继承抽象类时，需要初始化抽象类的属性，实现抽象类的方法。

::: warning 注意

抽象属性和抽象方法只能存在于抽象类中，抽象类不能实例化。

:::

- **protected**：效果类似 `private`，但有一点不同， `protected`成员在派生类中仍然可以访问。

```typescript
// 抽象类：棋子 
abstract class Chess {
   x: string;
   y: string;
   abstract readonly name: string;
   
   // 移动
   move(targetX: string, targetY: string): boolean {
     // 前两个步骤是所有棋子移动时都需要执行的步骤，只有第三步不同，因此可以将第三步抽象成一个方法
     console.log('1.边界判断')
     console.log('2.目标位置是否有己方棋子')
     // 3.移动规则
     if (this.rule(targetX, targetY)) {
       this.x = targetX;
       this.y = targetY;
       return true;
     }
     return false
   }
  
   protected utils() {}
   
   // 移动规则
   abstract rule(targetX: string, targetY: string): boolean;
 }

const c = new Chess(); // ❌ 报错：抽象类不能实例化

// 子类：马
class Horse extends Chess {
  // 初始化抽象属性
  readonly name: string = '马'
  
  // 实现抽象方法
  rule(targetX: string, targetY: string): boolean {
    this.utils(); // 可以执行utils方法
    if (马走日) {
      return true
    }
    return false
  }
}
```

