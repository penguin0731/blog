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

