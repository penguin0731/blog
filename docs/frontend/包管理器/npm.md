# npm

node package manager，即 node 包管理器。

包管理器是用于管理软件包、库以及相互的依赖关系的一种工具。

npm 由3个部分组成：

- npm的官网：[https://www.npmjs.com/](https://www.npmjs.com/) ，在这可以注册账号发布包，也可以搜索包。
- CLI：命令行接口，如 npm install、npm init 等。
- registry：npm 包对应的代码仓库

## 包的概念

包本质上就是一个目录，目录中包含了多个模块（即一个个单独的 js 文件），并且通过一个特殊的文件 `package.json`来对这个包进行说明。

如果我们要发布 npm 包，就必须要有 `package.json`文件。

一个包可以分为 scoped 和 unscoped，即作用域包和非作用域包。

### scoped package

作用域包必须以 @ 符号开头，格式为`@作用域名/包名`，常见的作用域包有`@vue/cli`等。

针对这种作用域包，在安装的时候，需要将作用域名也写上，如：

```shell
npm i @vue/cli -g
```

引入包时也同样需要将作用域名写上

```js
const mypkg = require('@/myorg/mypkg');
```

使用作用域包的好处：

1. 可以避免重名，作用域名相当于一个命名空间
2. 通过作用域名往往也能表示为某一系列包或某个组织

### unscoped package

非作用域包，即常见的包，发布时需要保证包名是全 npm 唯一，常见的非作用域包有 `lodash`、`axios`等。



## 常用CLI

### init

初始化 package.json 文件。

```shell
npm init
```

-y：跳过问题直接创建

### install

安装包。

```
npm install <packageName>
```

-g：全局安装

--save-dev（or -D）：安装在开发环境，即`devDependencies`

### uninstall

卸载包。

```shell
npm uninstall <packageName>
```

-g：全局安装

### ls

列出本地已安装的包。

```shell
npm ls
```

-g：列出全局安装的包

### link

建立包的快捷方式，即在全局的 node_modules 中创建一个软链接指向包。

```shell
npm link
```

#### 示例

有两个包 a、b，他们分别独立发布，现在包 b 需要用到包 a 的东西。

首先需要给包 a 在建立软链接，cd 到包 a 的目录，执行：

```shell
npm link
```

cd 到包 b 的目录，软链接安装（link-install）包 a，执行：

```shell
npm link a
```

这样，当包 a 在本地修改时，包 b 也能实时获取到包 a 的最新版本。

当开发完成后，需要断开软链接，cd 到包 b 的目录，执行：

```shell
npm unlink a
```

unlink 是 uninstall 的别名，这段命令相当于 `npm uninstall a`。

如果现在包 a 已经没有任何包所引用，那就可以从全局删除了，执行：

```shell
npm unlink -g a
```



## 包的说明文件

[官方说明](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)

### name

包名，必须唯一

### version

包的版本号，一般格式为`x.y.z`。

- x 代表主版本号（Major Version），一般是你的软件包发生了重大变化或者不兼容的升级，那么需要增加主版本号
- y 代表次版本号（Minor Version），当你的软件包增加了新的功能或者新的特性，需要增加次版本号
- z 代表修订号（Patch Version），当你的软件包进行 bug 的修复，性能的优化，较小的改动，需要增加修订号

### description

包的描述。

### keyword

包的关键词，用于描述和搜索。

```json
"keyword": ['good', 'tools']
```

### author

作者信息。

```json
"author": {
  "name": "John Doe",
  "email": "john.doe@example.com",
  "url": "https://example.com/johndoe"
}
```

### contributors

包的贡献者名单

### license

包的许可证信息，指定开源类型。

### repository

包的仓库地址。

```json
"repository": {
  "type" : "git",
  "url" : "https://github.com/npm/cli.git"
}
```

### engines

指定包需要的 node 版本和 npm 版本，从而避免环境问题。

```json
"engines": {
  "node": ">=12.0.0",
  "npm": ">=6.0.0"
},
```

## 包的执行配置

### main

包的入口文件。

### browser

如果你的包是在浏览器环境运行，那么可以指定浏览器环境的入口文件。

### bin

如果你的包有CLI（命令行接口），那么可以指定 CLI 的入口文件。

```json
"bin": {
	"myapp": "./cli.js"
}
```

如果包安装在本地，那么 npm 会将这个入口文件软链接到 `node_modules/.bin`，通过 `npx myapp` 就可以执行。

如果安装在全局，则可以可以直接执行 `myapp`。

### type

包使用的模块化，如果想使用 ES 模块，可以将文件扩展名设置为`.mjs`或将 type 设置为 `"module"`。

### scripts

配置可执行的命令。

通过 npm run 脚本名称 来执行。

脚本名称对应的命令如果有多条，可以用 && 来连接，npx 可以省略。

## 包的依赖配置

### dependencies

生产环境的依赖包

### devDependencies

开发环境的依赖包

### 语义版本

`package.json` 文件安装的依赖包需要有详细的依赖规则，这种规则叫做语义版本。

下面是常见的书写方式：

| 符号 | 描述                 | 示例          | 示例描述                                                     |
| ---- | -------------------- | ------------- | ------------------------------------------------------------ |
| >    | 大于某个版本         | >1.2.1        | 大于1.2.1版本                                                |
| >=   | 大于等于某个版本     | >=1.2.1       | 大于等于1.2.1版本                                            |
| <    | 小于某个版本         | <1.2.1        | 小于1.2.1版本                                                |
| <=   | 小于等于某个版本     | <=1.2.1       | 小于等于1.2.1版本                                            |
| -    | 介于两个版本之间     | 1.2.1 - 1.4.5 | 介于1.2.1和1.4.5之间                                         |
| x    | 不固定的版本号       | 1.3.x         | 只要保证主版本号是1，次版本号是3即可                         |
| ~    | 补丁版本号可增       | ~1.3.4        | 保证主版本号是1，次版本号是3，补丁版本号大于等于4            |
| ^    | 此版本和补丁版本可增 | ^1.3.4        | 保证主版本号是1，次版本号可以大于等于3，补丁版本号可以大于等于4 |
| *    | 最新版本             | *             | 始终安装最新版本                                             |

版本依赖控制始终是一个两难的问题。

如果允许版本增加，可以让依赖包的bug得以修复（补丁版本号），可以带来一些意外的惊喜（次版本号），但同样可能带来不确定的风险（新的bug）。

如果不允许版本增加，可以获得最好的稳定性，但失去了依赖包自我优化的能力。

而有的时候情况更加复杂，如果依赖包升级后，依赖也发生了变化，会有更多不确定的情况出现。

基于此，npm 在安装包的时候，会自动生成一个 package-lock.json 文件，该文件记录了安装包时的确切依赖关系。

当移植工程时，如果移植了 package-lock.json 文件，恢复安装时，会按照 package-lock.json 文件中的确切依赖进行安装，最大限度的避免了差异。

