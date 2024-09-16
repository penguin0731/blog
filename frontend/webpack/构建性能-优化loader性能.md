# 优化loader性能

## 进一步限制loader的应用范围

思路是，对于某些库，可以不使用loader。

例如：babel-loader可以转换ES6或更高版本的语法，可是有些库本身就是用ES5语法书写的，不需要转换，使用babel-loader反而会浪费构建时间。

lodash就是这样的一个库。

通过`module.rule.exclude`或`module.rule.include`，排除或仅包含需要应用loader的场景。

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /lodash/,
                use: "babel-loader"
            }
        ]
    }
}
```

如果暴力一点，甚至可以排除掉`node_modules`目录中的模块，或仅转换`src`目录的模块。

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                //或
                // include: /src/,
                use: "babel-loader"
            }
        ]
    }
}
```

这种做法是对loader的范围进行进一步的限制，和noParse不冲突，因为loader只是转换代码，noParse是对模块不解析的配置，两者没有关联。

## 缓存loader的结果

我们可以基于一种假设：如果某个文件内容不变，经过相同的loader解析后，解析后的结果也不变。

于是，可以将loader的解析结果保存下来，让后续的解析直接使用保存的结果。

`cache-loader`可以实现这样的功能：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['cache-loader', ...loaders]
      },
    ],
  },
}
```

有趣的是，`cache-loader`放到最前面，却能够决定后续的loader是否运行。

实际上，在（从右往左）执行loader之前，会先（从左往右）执行loader上的`pitch`方法。

```js
function testLoader(sourceCode) {
	return 'newCode';
}

/**
 * 
 * @param {string} remainingRequest 剩余请求的绝对路径，通过!连接
 * @param {*} precedingRequest 已请求的绝对路径，通过!连接
 * @param {*} data 数据对象，用于传递数据
 */
testLoader.pitch = function(remainingRequest, precedingRequest, data) {
	// 可返回可不返回
    // 若返回，则返回内容会作为源码字符串传递，并且会跳过该pitch方法所属的loader
}

module.exports = testLoader;
```

![image-20220712171610977](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220712171610977.png)

而catch-loader就是通过pitch方法来跳过loader的执行，从而减少了大量的构建时间。cache-loader还可以自定义配置，具体方式见[文档](https://www.webpackjs.com/loaders/cache-loader/)

::: warning 注意

保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 catch-loader。

:::



## 为loader的运行开启多线程

`thread-loader`会开启一个线程池，线程池中包含适量的线程。

它会把后续的loader放到线程池的线程中运行，以提高构建效率。

由于后续的loader会放到新的线程中，所以，后续的loader不能：

- 使用 webpack api 生成文件
- 无法使用自定义的 plugin api
- 无法访问 webpack options

在实际开发者，可以进行测试，来决定`thread-loader`放到什么位置。

::: warning 注意

开启和管理线程需要消耗时间，在小型项目中使用`thread-loader`反而会增加构建时间。

:::


