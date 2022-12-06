# VueCli配置

在根目录新建文件，命名为`vue.config.js`

```js
const path = require('path');
module.exports = {
	//是否打包sourcemap
    productionSourceMap: false,
    //设置输出目录
    outputDir: './myDist',
    // 如果是生产环境，则将css和js文件的引入路径前添加域名
    publicPath: process.env.NODE_ENV == 'production' ? 'http://www.duyiedu.com' : '/',
    //将css,js,img文件放到一起
    assetsDir: 'assets', 
    // 使用内置的webpack插件设置路径的简写
    // src/views 简写成 _v
    chainWebpack: config => {
		// config
        config.resolve.alias.set('_v', path.resolve(__dirname, 'src/views'))
    },
    devServer: {
		// 发送axios请求的代理
        proxy: {
			'/edu/chat/sendMsg': {
				target: 'https://developer.duyiedu.com'
			}
        }
    },
    //npm install style-resources-loader
    //安装好后自动生成
	pluginOptions: {
		// 将css样式注入到全局里
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				path.resolve(__dirname, 'src/assets/styles/variable.less')
			]
		}
	}
}
```

## 参考资料

- [官方文档 - VueCli配置参考](https://cli.vuejs.org/zh/config/)

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>
