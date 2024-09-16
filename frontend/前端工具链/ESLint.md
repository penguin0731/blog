# ESLint

ESLint 是一个可配置的 JavaScript 代码检查器，它能够帮助我们找到并修复 JavaScript 代码质量问题。

## [快速上手](https://eslint.org/docs/latest/use/getting-started)

在项目中安装 ESLint：

```shell
npm install --save-dev eslint
```

## 规则配置

在项目根目录下创建 `.eslintrc`文件，编写 json 格式配置。

### 规则严重性

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 打开规则作为警告（不影响退出代码）
- `"error"` 或 `2` - 打开规则作为错误（触发时退出代码为 1）

### [env](https://eslint.nodejs.cn/docs/latest/use/configure/language-options)

### extends

扩展配置，指定当前的配置文件继承另一个配置文件的所有特性（包括规则、插件、语言选项）。

属性值为：

- 字符串，配置文件的路径、官方的配置文件（`eslint:recommended` 或 `eslint:all`）
- 字符串数组，每个配置文件都继承了后面那个配置文件的配置

```
{
	rules: {
		eqeqeq: 'warn'
	}
}
```

### rules

定义代码规则，以规则名作为键，以规则严重性选项作为值。

```
{
	rules: {
		eqeqeq: 'warn'
	}
}
```

### [规则参考 ](https://eslint.nodejs.cn/docs/latest/rules/)

## 忽略文件

在根目录下创建`.eslintignore`文件，类似`.gitignore`。

```shell
# 忽略所有的 .min.js 文件
*.min.js

# 忽略整个 build 目录
/build/

# 忽略 node_modules 目录
node_modules/

# 忽略特定文件
my-special-file.js
```

## CLI

### --config（or -c）

指定配置文件。

```shell
eslint -c ~/myeslint.json .
```

### --no-eslintrc

不读取任何配置文件，使用默认配置。

### --fix

自动修复代码问题，但并不是全部问题，部分问题需要手动修复。

```shell
eslint --fix .
```

### --ouput-file（or -o）

允许 ESLint 的检查报告输出到一个文件里。

```shell
eslint -o report.txt .
```

### --cache

生成缓存文件 .eslintcache，在下次 ESLint 做检查时速度更快。

如果运行了 --cache，下一次没有运行 --cache，那么`.eslintcache` 文件将被删除。

```shell
eslint --cache .
```



## 如何避免 ESLint 和 Prettier 发生冲突？

ESLint 配置文件：

```json
// .eslintrc
{
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
  },
}
```

Prettier 配置文件：

```json
// .prettierrc
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

src/index.js：

```js
const str = 'Helo World'

const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
]

const obj = {
  name: 'John Doe',
  age: 30,
  address: {
    city: 'New York',
    state: 'NY',
  },
}

console.log(str)
console.log(arr)
console.log(obj)
```

此时，我们就会发现两份配置之间就存在了冲突。只要一格式化，Eslint 就会报错。

为了解决这个问题，有两个思路：

- 手动的将其中一个工具的配置文件进行修改，改成和另外一个工具的配置是相同的。这种方式肯定是没有问题的，但是缺点在于这种方式是手动的，如果涉及到大量的规则，那么手动操作比较繁琐
- 使用一些插件来帮助我们解决这个
  - `eslint-config-prettier`：会关闭所有与 Prettier 冲突的 ESLint 规则
  - `eslint-plugin-prettier`：将 Prettier 作为 ESLint 规则来运行，这样在运行 ESLint 时也会运行 Prettier。

接下来我们来安装这两个插件：

```shell
npm i eslint-config-prettier eslint-plugin-prettier -D
```

然后修改 ESLint 的配置文件，代码如下：

```json
{
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: false,
      },
    ],
  },
}
```

在上面的配置文件中，我们在 extends 里面添加了一个 plugin:prettier/recommended 配置项目，该配置项表示应用 Prettier 来作为 ESLint 的插件来运行，当遇到 ESLint 和 Prettier 冲突的规则的时候，关闭 ESLint 的然后用 Prettier 的。

我们也可以书写 rules，但是rules注意就不要再和 ESLint 冲突了，一般只修改规则严重性，不修改其他的配置项。