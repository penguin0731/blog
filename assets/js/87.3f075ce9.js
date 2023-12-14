(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{554:function(t,e,a){"use strict";a.r(e);var s=a(17),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vite-vs-webpack"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vite-vs-webpack"}},[t._v("#")]),t._v(" Vite vs webpack")]),t._v(" "),a("h2",{attrs:{id:"webpack原理图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webpack原理图"}},[t._v("#")]),t._v(" webpack原理图")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202307201535475.png",alt:"image-20230720153539438"}})]),t._v(" "),a("h2",{attrs:{id:"vite原理图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vite原理图"}},[t._v("#")]),t._v(" Vite原理图")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202307201536298.png",alt:"image-20230720153616252"}})]),t._v(" "),a("h2",{attrs:{id:"对比"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#对比"}},[t._v("#")]),t._v(" 对比")]),t._v(" "),a("h3",{attrs:{id:"启动开发服务器的流程不同"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动开发服务器的流程不同"}},[t._v("#")]),t._v(" 启动开发服务器的流程不同")]),t._v(" "),a("ul",[a("li",[t._v("webpack 先将源码进行打包，然后再启动开发服务器，请求服务器时直接返回打包结果")]),t._v(" "),a("li",[t._v("Vite 则是直接启动开发服务器，需要展示哪个模块就去请求哪个模块并实时进行编译")])]),t._v(" "),a("h3",{attrs:{id:"热更新-hmr-效率"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#热更新-hmr-效率"}},[t._v("#")]),t._v(" 热更新（HMR）效率")]),t._v(" "),a("ul",[a("li",[t._v("当一个模块改动时，webpack 会将该模块的依赖项全部重新编译一次，模块体积越大时，更新速度会直线下降")]),t._v(" "),a("li",[t._v("Vite 的热更新时在原生 ES Module 上执行的，当改动一个模块时，Vite 只需要重新请求那个模块就行，不需要重新将模块的依赖项重新编译，效率更高")])]),t._v(" "),a("h2",{attrs:{id:"vite-的优势"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vite-的优势"}},[t._v("#")]),t._v(" Vite 的优势")]),t._v(" "),a("p",[t._v("Vite 的优势在于开发环境，在启动开发服务器的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂、模块越多，Vite的优势越明显。")]),t._v(" "),a("h2",{attrs:{id:"为什么生产环境仍需打包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么生产环境仍需打包"}},[t._v("#")]),t._v(" 为什么生产环境仍需打包")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://cn.vitejs.dev/guide/why.html#why-bundle-for-production",target:"_blank",rel:"noopener noreferrer"}},[t._v("为什么生产环境仍需打包 | Vite 官方中文文档 (vitejs.dev)"),a("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=r.exports}}]);