# loader

loader的本质是一个函数，它的作用是将一个源码字符串转换成另一个源码字符串。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220707155032800.png" alt="image-20220707155032800" style="zoom:67%;" />

## 执行时机

loader是在解析模块的过程中被调用的。

在[编译过程](./编译过程)中，我们知道webpack在读取了文件内容（也就是源码字符串）后会对其进行语法分析，然后将其转换成AST。

实际上更加详细的过程是，webpack会将读取的文件内容交给loader处理，loader处理完后会返回新的源码字符串，然后webpack再对新的源码字符串进行语法分析。

![image-20220707165541527](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220707165541527.png)

## 处理流程

![image-20220707165907589](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220707165907589.png)

## 配置

我们可以通过[`module.rules`](https://www.webpackjs.com/configuration/module/#module-rules)字段来配置loader的匹配规则

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



