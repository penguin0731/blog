# 文件I/O

I/O：input/output，输入输出

常见的I/O设备有磁盘、网卡、显卡、打印机等，I/O的处理速度往往低于内存和CPU的处理速度。

## fs模块

fs模块给我们提供了与文件系统交互的能力，它提供的API有分同步和异步两种，如读取文件的同步方法`readFileAsync`和异步方法`readFile`。建议大家多使用异步方法，因为对文件的操作需要时间，使用异步不会阻塞，性能更好一点。

在ES6发布之后，node新增了基于Promise的API，使用方法如下：

```js
// v14.0.0的使用方法
const fs = require('node:fs/promises');
// v10.1.0的使用方法
const fs = require('fs').promises;
```

案例主要以回调的API为主，目录如下：

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

```js
const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, './myFile/2.txt');
const buffer = Buffer.from('test write file', 'utf-8');
fs.writeFile(filename, buffer, err => {
    if (err) throw err;
    console.log('写入成功');
});
```

