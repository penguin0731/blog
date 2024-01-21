# esbuild 常用配置

esbuild 有三种调用方式：CLI、在 JavaScript 中调用、在 Go 中调用。这里主要介绍在 JavaScript 中调用的方式。

esbuild API 有两种：Transform API 和 Build API。

Transform API 用于操作单个字符串，而不是访问文件系统，适用于没有文件系统的执行环境，如浏览器。

Build API 则用于操作一个或多个文件，我们常用的也是 Build API。

首先，我们在项目根目录下创建 `esbuild.config.mjs`，用`.mjs`是为了在 node 环境中使用 ES Module。

下面是一些基本配置：

- entryPoints：入口文件，可配置多个
- outfile：输出文件
- outdir：输出目录
- bundle：是否将入口文件的依赖模块一同打包进输出文件中
- platform：打包结果要运行的环境，值包含 browser、node
- format：输出格式，值包含 iffe(platform 为 browser 时是默认值)、esm、cjs(platform 为 node 时是默认值)
- minify：是否开启压缩
- sourcemap：开启soucemap，值包含 linked 或 true(生成`.js.map`文件映射`.js`)、inline(直接把 soucemap 内联在输出文件中)、external(生成`.js.map`但不映射`.js`)
- loader：类似 webpack 的 loader，将符合条件的源码字符串转换为另一种源码字符串。传入一个对象，key 是需要匹配的文件，value 是需要对匹配的文件使用的 loader



## 常用的 loader

esbuild 提供了几个常用的 loader，可参考官网的 [Content Types](https://esbuild.github.io/content-types/)

### js-loader

用于解析 `.js`、`.mjs`、`.cjs` 文件，esbuild 会默认加载这个 loader 来处理 js 文件，因此不用关注。

### ts-loader

用于解析 `.ts`、`.tsx`、`.mts`、`.cts` 文件，esbuild 会默认加载这个 loader 来处理 ts 文件，因此不用关注。

### jsx-loader

用于解析 `.jsx` 文件，esbuild 会默认加载这个 loader 来处理 jsx 文件。如果想要在 js 文件中使用 jsx 语法，需要自己配置，`".js": "jsx"`

### json-loader

用于解析 `.json` 文件，esbuild 会默认加载这个 loader 来处理 json 文件中的数据，将其转换为 js 对象并默认导出

### css-loader

用于解析 `.css` 文件，esbuild 会默认加载这个 loader 来处理，.module.css 文件也有对应的 local-css-loader 来处理

### text-loader

用于解析 .txt 文件，将其内容转换成字符串并默认导出

### binary-loader

在打包时，将目标文件解析为二进制数据并用 Base64 将其编码嵌入打包结果中。在运行时，会将其解码并默认导出为 Uint8Array

### base64-loader

将目标文件解析为二进制数据并用 Base64 将其编码嵌入打包结果中，并默认导出为字符串

### dataurl-loader

将目标文件解析为二进制数据并用 Base64 将其编码为 dataurl 嵌入到打包结果中

### file-loader

将目标文件复制到输出目录，并将导入该文件的语句`import()`、`require()`解析成该文件的 public uri，类似 webpack4 的 file-loader

### copy-loader

将目标文件复制到输出目录，并重写导入该文件的路径











