# Rollup 常用配置

## 多入口多产物配置

多个入口文件使用相同的构建配置：

```js
// rollup.config.js
import { defineConfig } from "rollup";

export default defineConfig({
  input: ["src/index.js", "src/main.js"],
  output: [
    {
      dir: "cjs",
      format: "cjs",
    },
    {
      dir: "esm",
      format: "esm",
    },
  ],
});
```

一个入口文件对应一种构建配置：

```js
// rollup.config.js
import { defineConfig } from "rollup";

const buildIndexOptions = defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "esm",
  },
});

const buildMainOptions = defineConfig({
  input: "src/main.js",
  output: {
    file: "dist/main.js",
    format: "esm",
  },
});

export default [buildIndexOptions, buildMainOptions];
```

## external

项目难免会遇到需要引入第三方库的时候，使用 external 配置项可以告诉 Rollup 哪些是第三方库，避免出现 `(!) Unresolved dependencies` 警告。

外部依赖的名称，需要和引入语句中写法完全一致。例如，如果想标记 `import "dependency.js"` 为外部依赖，就需要使用 `"dependency.js"` 作为模块 ID；而如果要标记 `import "dependency"` 为外部依赖，则使用 `"dependency"`。

```js
// index.js
import dayjs from "dayjs";

const now = dayjs();
```

```js
// rollup.config.js
import { defineConfig } from "rollup";
export default defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
  },
  external: ["dayjs"]
});
```

::: warning 注意

1. Rollup 只会解析导入的相对路径，即`/`， `./`，`../`开头的路径。对于导入第三方库的方式，即`import dayjs from "dayjs";`，是不支持的，因此才会出现`(!) Unresolved dependencies` 警告，表示依赖无法解析。
2. external 配置选项的作用只是将目标库排除在构建之外，表示这个目标库作为第三方库来引用。

:::

如果希望第三方库包含在你的打包结果中，则需要使用 Rollup 官方提供的插件`@rollup/plugin-node-resolve`。

## @rollup/plugin-node-resolve

@rollup/plugin-node-resolve 插件可以帮助我们将第三方库打包进我们的打包结果中。

```shell
npm install @rollup/plugin-node-resolve -D
```



```js
import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
  },
  // external: ["dayjs"],
  plugins: [resolve()],
});
```

重新打包，可以看到报错，这是因为 dayjs 库的主文件 dayjs.min.js 是已经打包好的代码文件，将 dayjs 挂载在全局了，因此无法解析。

![image-20231120145344506](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202311201453735.png)

不过 dayjs 提供了 ES Module 格式，只需要将`import dayjs from "dayjs";`改为`import dayjs from "dayjs/esm";`即可。

但是开发者不可能时时刻刻关注使用的第三方库是否使用或支持 ES Module 导出，这会增加开发者的心智负担，这就需要 Rollup 官方提供的另一个插件`@rollup/plugin-commonjs`。

## @rollup/plugin-commonjs

大部分的第三方库都是使用 CommonJS 来导出，这会影响到 Rollup 的打包结果，`@rollup/plugin-commonjs` 插件可以在 Rollup 打包之前，将这些使用 CommonJS 导出的第三方库转化为 ES Module 导出。

::: warning 注意

请注意，大多数情况下，`@rollup/plugin-commonjs` 应该放在转换模块的其他插件之前。

这是为了防止其他插件对 CommonJS 检测产生影响。一个例外是 Babel 插件，如果你使用它，请将它放在 CommonJS 插件之前。

Rollup 的插件是从左往右运行。

:::

```shell
npm install @rollup/plugin-commonjs -D
```



```js
import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
  },
  // external: ["dayjs"],
  plugins: [resolve(), commonjs()],
});

```

但我们会注意到，打包结果 bundle.js 的内容非常多，这是因为第三方库的内容都被打包进去了，这不是我们想要的，这时候就需要使用到代码分割。

## 代码分割

当我们使用动态导入或多入口配置时，Rollup 是会隐式的进行代码分割的，但还有一种情况可以显示的告诉 Rollup 哪些模块需要拆分成单独的块，即 ouput.manualChunks。

需要注意的是，当产生了一个以上的打包结果时，需要将 file 选项替换成 dir 选项，表示所有生成的打包结果被放置在哪个目录。如果只有一个打包结果，才使用 file 选项。

```js
import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  input: "src/index.js",
  output: {
    // file: "dist/bundle.js",
    dir: "dist/",
    format: "esm",
    manualChunks: {
      dayjs: ["dayjs"],
    },
  },
  // external: ["dayjs"],
  plugins: [resolve(), commonjs()],
});

```

## Babel

如果想使用 JavaScript 的新特性并且保证代码的兼容性，那么就需要使用到 Babel，而在 Rollup 中使用 Babel 需要借助 `@rollup/plugin-babel`插件。

```shell
npm install @rollup/plugin-babel -D
```



```js
import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: "src/index.js",
  output: {
    // file: "dist/bundle.js",
    dir: "dist/",
    format: "esm",
    manualChunks: {
      dayjs: ["dayjs"],
    },
  },
  // external: ["dayjs"],
  plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' })],
});

```

此时打包结果是没有什么变化的，因为我们需要进行预设，在项目根目录下创建一个名为 `src/.babelrc.json` 的新文件：

```json
{
	"presets": ["@babel/env"]
}
```

并安装`@babel/core`和 `@babel/preset-env`：

```shell
npm i -D @babel/core @babel/preset-env
```

重新打包之后，可以发现一些新特性的语法已经被转换了，如箭头函数、let/const等等。但是新特性中的内置对象和 API 却还是原封不动，如Promise、数组的forEach、map等等。这些代码需要 polyfill，我们可以通过以下插件来实现：

- `@babel/runtime-corejs3`：Babel 进行转译过程中需要用到的插件，但在转译过程中可能会产生很多重复代码，通常和`@babel/plugin-transform-runtime`配合使用
- `@babel/plugin-transform-runtime`：可以复用 Babel 转译过程产生的代码，以节省代码体积

```shell
npm i @babel/runtime-corejs3 @babel/plugin-transform-runtime -D
```

还需要修改`.babelrc.json`文件：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead",
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

重新打包之后，就会发现新特性语法的 polyfil 已经生成了。

## rollup-plugin-generate-html-template

html模板



## rollup-plugin-clear

清除文件



## @rollup/plugin-alias

别名插件



## @rollup/plugin-terser

压缩插件



## rollup-plugin-visualizer

打包结果分析

