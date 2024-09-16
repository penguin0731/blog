# SWC

SWC 是一个基于 Rust 的 Web 平台。它被 Next.js、Parcel 和 Deno 等工具以及 Vercel、字节跳动、腾讯、Shopify 等公司使用。

SWC 可用于编译和打包。 对于编译，它使用现代 JavaScript 特性获取 JavaScript / TypeScript 文件，并输出所有主要浏览器支持的有效代码。

SWC 的特点就是快。

SWC 在单线程上**比 Babel 快 20 倍**，在四核上**比 Babel 快 70 倍**。

没错，SWC 对标的就是 Babel，致力成为 Babel 的替代品。而 SWC 之所以可以那么快，主要是由于以下几个因素：

- 编程语言：SWC 是用 Rust 语言编写的。Rust 是一种系统编程语言，它旨在提供内存安全性，无数据竞争，并且有着高效的性能。Rust 的执行速度通常比 JavaScript 快。

- 并行处理：Rust 具有优秀的并行处理和并发能力。当在多核 CPU 上运行时，SWC 能够有效地利用这些核心并行执行任务，从而大大提高了处理速度。

- 优化的设计：SWC 设计上对性能进行了优化。例如，它使用一次性遍历（single-pass traversal）来转换代码，这种方法比 Babel 使用的多次遍历更高效。

- 跳过不必要的工作：与 Babel 不同，SWC 可以跳过一些不必要的工作，例如不需要生成和处理 SourceMaps，除非明确需要。

## API

安装 SWC 的核心 API 库：

```shell
npm i @swc/core -D
```

在 src 目录下创建 compile.js 文件：

```js
const swc = require("@swc/core");
const fs = require("fs");
const path = require("path");

// 拼接路径
const codePath = path.resolve("src", "index.js");
const sourceCode = fs.readFileSync(codePath, "utf8");
const outDir = path.resolve(__dirname, "dist");

swc
  .transform(sourceCode, {
    jsc: {
      target: "es5", // 设置目标JavaScript版本
      parser: {
        syntax: "ecmascript", // 设置源代码的语法
      },
    },
  })
  .then((res) => {
    // console.log(res.code)
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    const outputFilePath = path.join(outDir, "index.js");
    fs.writeFileSync(outputFilePath, res.code);
  })
  .catch((err) => {
    console.error(err);
  });
```

## CLI

安装 CLI 工具库：

```shell
npm i -D @swc/cli @swc/core
```

### --out-file（or -o）

输出文件。

```shell
swc input.js -o output.js
```

### --out-dir（or -d）

输出目录。

```shell
swc src -d dist
```

### --watch (or -w)

监听变化。

需要安装 chokidar：

```shell
npm i -D chokidar
```

```
swc input.js -w -o output.js
```

### --copy-files 

复制文件。

```shell
swc src --copy-files lib
```

## 规则配置

在项目根目录下创建 `.swcrc`文件，编写 json 格式配置。

使用 SWC 进行开箱即用的编译，不需要定制。 你也可以选择覆盖该配置。 以下是默认值：

```json
{
  //  这个配置项用于设置 JavaScript的 编译选项
  "jsc": {
    // 这个配置项用于设置解析器的选项
    "parser": {
      // 设置源代码的语法，可以是 ecmascript、jsx、typescript 或 tsx
      "syntax": "ecmascript",
      // 是否启用JSX语法
      "jsx": false,
      // 是否启用动态 import() 语句
      "dynamicImport": false,
      // 是否启用私有方法和访问器
      "privateMethod": false,
      // 是否启用函数绑定语法（::操作符）
      "functionBind": false,
      // 是否启用 export v from 'mod' 语法
      "exportDefaultFrom": false,
      // 是否启用 export * as ns from 'mod' 语法
      "exportNamespaceFrom": false,
      // 是否启用装饰器语法
      "decorators": false,
      // 是否在导出之前应用装饰器
      "decoratorsBeforeExport": false,
      // 是否启用顶级 await 语法
      "topLevelAwait": false,
      // 是否启用 import.meta 语法
      "importMeta": false,
      // 是否保留所有注释
      "preserveAllComments": false
    },
    // 设置转换插件，通常不需要手动设置
    "transform": null,
    // 设置目标 JavaScript 版本
    // 例如 es3、es5、es2015、es2016、es2017、es2018、es2019、es2020
    "target": "es5",
    // 是否启用宽松模式，这会使编译后的代码更简短，但可能不完全符合规范
    "loose": false,
    // 是否引用外部的 helper 函数，而不是内联它们
    "externalHelpers": false,
    // 是否保留类名，这需要版本 v1.2.50 或更高
    // 且 target 需要设置为 es2016 或更高
    "keepClassNames": false
  },
  // 这个配置项用于指示输入的源代码是否是模块代码。
  // 如果是，那么 import 和 export 语句将被正常处理
  // 否则，它们将被视为语法错误
  "isModule": false
}
```

