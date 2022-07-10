# loader

loader的本质是一个函数，它的作用是将一个源码字符串转换成另一个源码字符串。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220707155032800.png" alt="image-20220707155032800" style="zoom:67%;" />

## 执行时机

loader是在解析模块的过程中被调用的。

在[编译过程](./编译过程.md)中，我们知道webpack在读取了文件内容（也就是源码字符串）后会对其进行语法分析，然后将其转换成AST。

实际上更加详细的过程是，webpack会将读取的文件内容交给loader处理，loader处理完后会返回新的源码字符串，然后webpack再对新的源码字符串进行语法分析。

![image-20220707165541527](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220707165541527.png)

## 处理流程

1. 在读取到文件内容后，webpack会根据loader配置的规则判断当前模块是否满足
   1. 如果满足，则会读取该规则中对应的loader，然后将读取到的loader函数依次放入到loaders数组中
   2. 如果不满足，那么loaders数组则为空
2. 将源码字符串自右向左（或自下向上）经过loader函数处理得到最终的源码字符串



![image-20220707165907589](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220707165907589.png)

## 配置

我们可以通过[`module.rules`](https://www.webpackjs.com/configuration/module/#module-rules)字段来配置loader的匹配规则。

### 完整配置

```js
module.exports = {
    module: { // 针对模块的配置，目前版本只有两个配置，rules、noParse
        rules: [ // 模块匹配规则，可以存放多个规则
            { // 每个规则对象
                test: /\.js$/, // 匹配模块的正则表达式
                use: [ // 匹配到后使用的规则模块
                    {
                        loader: '模块路径', // loader模块的路径，该字符串会放置到require中
                        options: {} // 向对应loader传递的额外参数
                    }
                ]
            }
        ]
    }
}
```

### 简约配置

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["模块路径1", "模块路径2"]
            }
        ]
    }
}
```

## 案例

### 处理图片

目录如下：

:::vue

├─loaders
|  ├─img-loader
|  |   └index.js
├─src
|  ├─index.js
|  ├─assets
|  |   └webpack.png
|  |   └penguin.jpg
├─package.json
|  ├─loader-utils: ^1.2.3
|  ├─webpack: ^4.36.1
|  ├─webpack-cli: ^3.3.10
├─webpack.config.js

:::

```js
// img-loader.js
var loaderUtils = require('loader-utils');

function getBase64(buffer, ext) {
    return `data:image/${ ext };base64,${ buffer.toString('base64') }`
}

function getFilePath(buffer, name) {
    var filename = loaderUtils.interpolateName(this, name, {
        content: buffer
    });
    this.emitFile(filename, buffer); // 生成一个文件
    return filename
}

module.exports = function(buffer) {
    var { limit = 1000, name = '[name].[ext]' } = loaderUtils.getOptions(this);
    var content;
    if (buffer.byteLength > limit) {
        content = getFilePath.call(this, buffer, name);
    } else {
        var splitArr = this.resourcePath.split('.');
        var ext = splitArr[splitArr.length - 1]; // 获取后缀名
        content = getBase64(buffer, ext);
    }
    return `module.exports = \`${ content }\``
}

// 默认情况下，资源文件（即sourceCode入参）会被转换成utf-8字符串
// 通过设置静态属性raw为true，可以接收原始的Buffer
module.exports.raw = true;

```

```js
// index.js
var imgSrc = require('./assets/webpack.png');
console.log(imgSrc);
var img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);
```

```js
// webpack.config.js
var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(png)|(jpg)|(jpeg)|(gif)$/,
                use: [
                    {
                        loader: './loaders/img-loader',
                        options: {
                            limit: 10000, // 超过10kb使用图片，否则使用base64
                            name: 'img-[contenthash:5].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map'
}
```



## 参考链接

- [模块(module) | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/configuration/module/)

- [编写一个 loader | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/contribute/writing-a-loader/)
- [loader API | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/api/loaders/)

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>
