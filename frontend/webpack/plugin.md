# plugin

plugin的目的在于解决loader无法实现的其他事，比如：

- 当webpack生成文件时，顺便新增一个说明文件
- 当webpack编译启动时，在命令行中输出一句编译启动了
- ......

像这种在webpack编译过程中嵌入一些功能的操作，就是plugin所能实现的。

![image-20220710194414851](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220710194414851.png)



## 剖析

plugin本质是一个带有apply方法的对象，apply方法会在初始化阶段，创建好Compiler对象后运行。

Compiler对象是在初始化阶段构建的，整个webpack打包期间只有一个Compiler对象，后续完成打包工作的是Compiler对象内部创建的Compilation。

apply方法会在Compiler对象创建后被其调用，并传入一个Compiler对象。

![image-20220710221956873](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220710221956873.png)

compiler对象提供了大量的钩子函数（hooks，可以理解为事件），plugin的开发者可以注册这些钩子函数，参与webpack编译和生成。

我们可以使用下面的代码注册钩子函数：

```js
class MyPlugin{
    apply(compiler){
        compiler.hooks.钩子名称.钩子类型(name, function(compilation){
            //钩子处理函数
        })
    }
}
```

### [钩子名称](https://webpack.docschina.org/api/compiler-hooks/)

即事件名称。

### 钩子类型

这一部分使用的是 [Tapable API](https://github.com/webpack/tapable)，这个小型的库是一个专门用于钩子函数监听的库。

它提供了一些事件类型：

- tap：注册一个同步的钩子函数，函数运行完毕则表示事件处理结束
- tapAsync：注册一个基于回调的异步的钩子函数，函数通过调用一个回调表示事件处理结束
- tapPromise：注册一个基于Promise的异步的钩子函数，函数通过返回的Promise进入已决状态表示事件处理结束

### 钩子处理函数

钩子处理函数有一个参数`compilation`

## 案例

### 添加文件列表

目录如下：

:::vue
├─src
|  ├─index.js
|  ├─plugins
|  |    ├─FileListPlugin
|  |    |       └index.js
├─package.json
|  ├─webpack: ^4.36.1
|  ├─webpack-cli: ^3.3.10
├─webpack.config.js

:::

```js
// FileListPlugin.js
module.exports = class FileListPlugin {
    constructor(filename = 'filelist.txt') {
        this.filename = filename
    }

    apply(compiler) {
        // 在输出打包文件前
        compiler.hooks.emit.tap('FileListPlugin', (complation) => {
            var filelist = [];
            // 遍历资源列表
            for (const key in complation.assets) {
                var content = `【${ key }】\n大小：${complation.assets[key].size() / 1000}KB`;
                filelist.push(content)
            }
            var str = filelist.join('\n\n');
            complation.assets[this.filename] = {
                source() { return str }, // 新增文件的内容
                size() { return str.length } // 新增文件的大小
            }
        })
    }
}
```

```js
// webpack.config.js
var FileListPlugin = require('./src/plugins/FileListPlugin');

module.exports = {
    mode: 'development',
    plugins: [
        new FileListPlugin('文件列表.md')
    ],
    devtool: 'source-map'
}
```





