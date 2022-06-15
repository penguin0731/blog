# 文件I/O

I/O：input/output，输入输出

常见的I/O设备有磁盘、网卡、显卡、打印机等，I/O的处理速度往往低于内存和CPU的处理速度。

## fs模块

案例目录如下：

::: vue 

├─index.js
├─package-lock.json
├─package.json
├─myFile
|   └1.txt

:::

### [读取文件](http://nodejs.cn/api/fs.html#fsreadfilepath-options-callback)

```js
const fs = require('fs');
const path = require('path');

// bad
// fs.readFile('./1.txt');

// good
const filename = path.resolve(__dirname, '/1.txt');
fs.readFile(filename, 'utf-8', (err, content) => {
    console.log(err, content);
});
```

::: warning 注意

这里不推荐直接使用相对路径，因为这里相对的是命令行所在的文件路径，而不是当前模块的文件路径。因此为了避免错误，请直接使用绝对路径。

:::

### [写入文件](http://nodejs.cn/api/fs.html#fswritefilefile-data-options-callback)

```

```

