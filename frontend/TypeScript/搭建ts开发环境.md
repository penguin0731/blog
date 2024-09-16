# 搭建 ts 开发环境

## 安装

```shell
npm i typescript -g
```

安装完毕后，可以通过 `tsc -v`命令来判断是否安装成功。



## 使用配置文件

通过命令行创建 ts 配置文件。

```shell
tsc --init
```

默认情况下，ts 会做出下面几种假设：

1. 假设当前执行宿主环境是浏览器
2. 如果代码中没有模块化语句(import、export)，则认为该代码是全局执行
3. 编译的目标代码是 ES3

这三种假设都可以通过配置文件来修改。

```json
// tsconfig.json
{
    // 编译选项
    compilerOptions: {
        target: "es2016", // 编译目标代码的版本标准
        module: "commonjs", // 编译目标使用的模块化标准
        lib: ["es2016"], // 配置执行环境
        outDir: "./dist", // 编辑结果存放路径
        strictNullChecks: true, // 更严格的空类型检查
    },
    include: ["./src"], // 要编译的目录
}
```

使用了配置文件后，通过 tsc 命令进行编译时，不能跟上文件名，否则会忽略配置文件。

lib 选项中没有 node 环境，如果想要使用 node 环境中的 api，需要安装 `@types/node`。

`@types` 是一个 ts 官方的类型库，当我们使用的一些用原声 js 开发的第三方库，如 axios、jquery，又希望能有类型检查时，可以去 `@types` 中查找是否有对应的库。

## 简化开发流程

在日常的开发工作中，我们不可能每次修改文件之后都要手动编译一次。这时候可以借助第三方工具 ts-node、nodemon 来简化开发流程。

### ts-node

安装：

```shell
npm i ts-node -g
```

通过 ts-node 命令可以在内存中完成编译并运行。

```shell
ts-node src/index.ts
```

### nodemon

安装：

```shell
npm i nodemon -D
```

使用 nodemon 可以监听文件的变化。

```shell
nodemon -e ts --exec ts-node src/index.ts
```

上述命令的含义是，启动 nodemon 监听扩展名为 ts 的文件变化，发生变化时执行 ts-node 命令。