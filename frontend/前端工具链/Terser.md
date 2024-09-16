# Terser

Terser 是一个 JavaScript 代码压缩混淆工具。Terser 是 Uglify-es 的替代品，后者已经停止维护，Terser 支持 ES6 和更高版本的 JavaScript。

Terser 的主要功能：

- 删除无用的代码：Terser 会删除代码中未使用的变量和函数
- 压缩和混淆代码：Terser 会将代码中的变量和函数名压缩，使得代码难以被理解，从而提高安全性
- 支持 SourceMap

## 安装

```shell
npm i terser -D
```

## API

```js
// 对源码进行压缩
const { minify } = require("terser");
const path = require("path");
const fs = require("fs");

// 定义输入和输出文件的路径
const codePath = path.resolve("src", "index.js");
const outDir = "dist";
const outPath = path.resolve(outDir, "index.js");
const outSourcemapPath = path.resolve(outDir, "index.js.map");

// 读取源码文件
const code = {
  "index.js": fs.readFileSync(codePath, "utf8"),
};

// 压缩对应的配置项
const options = {
  sourceMap: {
    filename: "index.js",
    url: "index.js.map",
  },
};

// 准备工作完成后，接下来就调用 API 进行压缩
minify(code, options)
  .then((result) => {
    // console.log(result)
    // 将压缩后的内容写入到规定的位置
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outPath, result.code);

    // 生成 sourcemap
    if (result.map) {
      fs.writeFileSync(outSourcemapPath, result.map);
    }

    console.log("压缩工作已完成...");
  })
  .catch((err) => {
    console.log("压缩工作失败，错误信息如下：");
    console.error(err);
  });
```

## CLI

基本的命令格式：

```shell
terser [input files] [options]
```

### --output（or -o）

输出文件。

```shell
terser ./src/index.js -o ./dist/index.js
```

### --source-map

生成 SourceMap，需要与 `--ouput` 结合使用，即`--source-map --output output.js`（SourceMap 的内容将被写入到 output.js.map 中）

```
terser ./src/index.js -o ./dist/index.js --source-map -o ./dist/index.js
```

