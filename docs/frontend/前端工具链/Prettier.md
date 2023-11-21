# Prettier

Prettier 是一个代码格式修正工具。

Prettier 官方文档中是这样介绍自己的：`Prettier is an opinionated code formatter`

opinionated 的字面意思是固执己见的，它的反义词的则是 unopinionated 虚怀若谷的。在许多工具库、框架中都会介绍自己是 opinionated 还是 unopinionated。

opinionated 的思路是，我已经帮你把一切事情都做好了，你只需要直接使用就行。

unopinionated 的思路则是，我给你提供了许多工具、零件，它们各有优劣，你需要按照自己的需求自行组装。

这也意味着，Prettier 提供的代码风格是最优的，开发者不需要做太多自定义的内容。

## 快速上手

详情见官网[Prettier](https://www.prettier.cn/docs/install.html)。

## 规则配置

在项目根目录下创建 `.prettierrc`文件，编写 json 格式配置。

### printWidth

指定一行代码的最大长度，默认80。

### tabWidth

执行 tab 键的空格数，默认为2。

### semi

是否在语句尾部添加分号，默认 true。

### singleQuote

字符串是否使用单引号，默认 false。

### jsxSingleQuote

jsx语法中的字符串是否使用单引号，默认 false。

### arrowParens

当箭头函数只有一个参数时，是否使用括号，默认 `"always"`。

选项：

- `"always"`：总是使用括号包裹参数，如`(x) => x`
- `"avoid"`：忽略括号，如`x => x`

### trailingComma

在对象或数组最后一项的尾部添加逗号，默认 `"all"`。

默认值在 v3.0.0 中将 `"es5"` 改为了 `"all"`。

选项：

- `"all"`：尽可能的使用逗号
- `"es5"`：只在 es5 的对象或数组中添加
- `"none"`：不使用逗号

### bracketSpacing

是否在对象的大括号内输入空格，默认 true。

选项：

- `true`：`{ foo: bar }`
- `false`：`{foo: bar}`

### bracketSameLine

是否将 HTML 标签的结束符 `>`放在最后一行的末尾，默认 true。

选项：

- `true`：


```html
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}>
  Click Here
</button>
```

- `false`：

```html
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}
>
  Click Here
</button>
```



## 忽略文件

在根目录下创建`.prettierignore`文件，类似`.gitignore`。

```
# 忽略所有的 .min.js 文件
*.min.js

# 忽略整个 build 目录
/build/

# 忽略 node_modules 目录
node_modules/

# 忽略特定文件
my-special-file.js
```

