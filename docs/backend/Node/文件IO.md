# 文件I/O

I/O：input/output，输入输出。

常见的I/O设备有磁盘、网卡、显卡、打印机等，I/O的处理速度往往低于内存和CPU的处理速度。


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
|   ├─1.txt
|   ├─2.txt
|   ├─sub

:::

## [读取文件](http://nodejs.cn/api/fs.html#fsreadfilepath-options-callback)

```js
const fs = require('fs');
const path = require('path');

// bad
// fs.readFile('./myFile/1.txt');

// good
const filename = path.resolve(__dirname, './myFile/1.txt');
fs.readFile(filename, 'utf-8', (err, content) => {
    console.log(err, content);
});
```

::: warning 注意

这里不推荐直接使用相对路径，因为这里相对的是命令行所在的文件路径，而不是当前模块的文件路径。因此为了避免错误，请直接使用绝对路径。

:::

## [写入文件](http://nodejs.cn/api/fs.html#fswritefilefile-data-options-callback)

```js
const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, './myFile/2.txt');
fs.writeFile(filename, 'test', {
    flag: 'a' // 表示添加内容，而不是覆盖
}, err => {
    if (err) throw err;
    console.log('写入成功');
});
```

::: warning 注意

如果写入的路径里有不存在的文件夹，那么就会报错。正确的做法应该是先创建好文件夹再写入。

:::

## [删除文件](http://nodejs.cn/api/fs.html#fsunlinkpath-callback)

```js
const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, './1.txt');
fs.unlink(filename, err => {
	if (err) throw err;
    console.log('删除成功');
});
```

## [获取文件或文件夹信息](http://nodejs.cn/api/fs.html#fsstatpath-options-callback)

```js
const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, './myFile/2.txt');
fs.stat(filename, (err, stats) => {
    console.log(stats.isDirectory()); // false
    console.log(stats);
});
```

其中，`stats`的内容包括：

- `size`：占用的字节数
- `atime`：上次访问的时间
- `mtime`：上次文件内容被修改的时间
- `ctime`：上次文件状态被修改的时间
- `birthtime`：文件创建时间
- `isDirectory()`：判断是否是目录
- `isFile()`：判断是否是文件

## [获取文件夹中的文件和子文件夹](http://nodejs.cn/api/fs.html#fsreaddirpath-options-callback)

```js
const fs = require('fs');
const path = require('path');

const dirname = path.resolve(__dirname, './myFile');
fs.readdir(dirname, (err, files) => {
    console.log(files); // [ '1.txt', '2.txt' ]
});
```

## [创建文件夹](http://nodejs.cn/api/fs.html#fsmkdirpath-options-callback)

```js
const fs = require('fs');
const path = require('path');

const dirname = path.resolve(__dirname, './myFile/sub');
fs.mkdir(dirname, err => {
    if (!err) {
        console.log('文件夹创建成功')
    } 
});
```

## [删除文件夹](http://nodejs.cn/api/fs.html#fsrmdirpath-options-callback)

```js
const fs = require('fs');
const path = require('path');

const dirname = path.resolve(__dirname, './test');
fs.rmdir(dirname, err => {
	if (err) throw err;
    console.log('文件夹删除成功');
});
```

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>
