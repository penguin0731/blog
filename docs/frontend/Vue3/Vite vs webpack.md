# Vite vs webpack



## webpack原理图



![image-20230720153539438](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202307201535475.png)

## Vite原理图

![image-20230720153616252](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202307201536298.png)



## 对比

### 启动开发服务器的流程不同

- webpack 先将源码进行打包，然后再启动开发服务器，请求服务器时直接返回打包结果
- Vite 则是直接启动开发服务器，需要展示哪个模块就去请求哪个模块并实时进行编译

### 热更新（HMR）效率

- 当一个模块改动时，webpack 会将该模块的依赖项全部重新编译一次，模块体积越大时，更新速度会直线下降
- Vite 的热更新时在原生 ES Module 上执行的，当改动一个模块时，Vite 只需要重新请求那个模块就行，不需要重新将模块的依赖项重新编译，效率更高



## Vite 的优势

Vite 的优势在于开发环境，在启动开发服务器的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂、模块越多，Vite的优势越明显。



## 为什么生产环境仍需打包

[为什么生产环境仍需打包 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/why.html#why-bundle-for-production)