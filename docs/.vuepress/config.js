import { defineUserConfig } from 'vuepress'
import envConfig from './envConfig';
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

const env = process.env.NODE_ENV;
const clientId = envConfig[env].clientId;
const clientSecret = envConfig[env].clientSecret;

module.exports = defineUserConfig({
  bundler: viteBundler(),
  title: "陈欣健的博客",
  description: "基于vuepress搭建的个人博客",
  base: "/",
  host: "localhost",
  port: "2000",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    // 引入百度统计代码
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?8bdb20f90af1eef474132fd92bfeb8cc";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `,
    ],
  ],
  theme: defaultTheme({
    sidebar: {
      "/frontend/": [
        'introduction/',
        {
          text: "HTML",
          prefix: 'HTML',
          collapsible: true,
          children: [
            '语义化的理解',
            'src和href的区别',
            'Canvas系列：碰撞检测',
          ],
        },
        {
          text: "CSS",
          prefix: 'CSS',
          collapsible: true,
          children: [
            'Selectors',
            '盒模型',
            '圣杯布局与双飞翼布局',
            'flex布局',
            'grid布局',
            '单行与多行文本的溢出处理',
            'CSS工程化',
            'Sass',
            'Postcss',
          ],
        },
        // {
        //   title: "JavaScript",
        //   collapsible: true,
        //   children: [
        //     { title: "介绍", path: "JavaScript/介绍" },
        //     { title: "this对象", path: "JavaScript/this对象" },
        //     { title: "执行上下文", path: "JavaScript/执行上下文" },
        //     { title: "作用域", path: "JavaScript/作用域" },
        //     { title: "闭包", path: "JavaScript/闭包" },
        //     { title: "原型与继承", path: "JavaScript/原型与继承" },
        //     {
        //       title: "DOM事件的传播机制",
        //       path: "JavaScript/DOM事件的传播机制",
        //     },
        //     { title: "【ES6+】Class", path: "JavaScript/【ES6+】Class" },
        //     { title: "【ES6+】Symbol", path: "JavaScript/【ES6+】Symbol" },
        //     { title: "【ES6+】Set与Map", path: "JavaScript/【ES6+】Set与Map" },
        //     { title: "【ES6+】Promise", path: "JavaScript/【ES6+】Promise" },
        //     {
        //       title: "【ES6+】新增的ObjectAPI",
        //       path: "JavaScript/【ES6+】新增的ObjectAPI",
        //     },
        //     { title: "blob下载文件", path: "JavaScript/blob下载文件" },
        //     {
        //       title: "前端最佳实践-判断对象是否存在某个属性",
        //       path: "JavaScript/前端最佳实践-判断对象是否存在某个属性",
        //     },
        //     {
        //       title: "前端最佳实践-类型检测",
        //       path: "JavaScript/前端最佳实践-类型检测",
        //     },
        //     { title: "浮点数精度问题", path: "JavaScript/浮点数精度问题" },
        //   ],
        // },
        // {
        //   title: "Vue",
        //   collapsible: true,
        //   children: [
        //     { title: "介绍", path: "Vue/介绍" },
        //     { title: "指令", path: "Vue/指令" },
        //     { title: "组件通信", path: "Vue/组件通信" },
        //     { title: "VueCli配置", path: "Vue/VueCli配置" },
        //     { title: "虚拟DOM", path: "Vue/虚拟DOM" },
        //     { title: "Vue响应式原理", path: "Vue/Vue响应式原理" },
        //     { title: "computed和watch", path: "Vue/computed和watch" },
        //     { title: "Vue的长列表优化", path: "Vue/Vue的长列表优化" },
        //   ],
        // },
        // {
        //   title: "Vue3",
        //   collapsible: true,
        //   children: [
        //     { title: "Vue3 和 Vue2 的区别", path: "Vue3/Vue3 和 Vue2 的区别" },
        //     { title: "<script setup>", path: "Vue3/<script setup>" },
        //     { title: "Pinia", path: "Vue3/Pinia" },
        //     { title: "Vite vs webpack", path: "Vue3/Vite vs webpack" },
        //   ],
        // },
        // {
        //   title: "React",
        //   collapsible: true,
        //   children: [
        //     { title: "介绍", path: "React/介绍" },
        //     { title: "JSX", path: "React/JSX" },
        //     { title: "React组件", path: "React/React组件" },
        //     { title: "深入认识setState", path: "React/深入认识setState" },
        //     { title: "类组件的生命周期", path: "React/类组件的生命周期" },
        //     { title: "ref", path: "React/ref" },
        //     { title: "Context", path: "React/Context" },
        //     {
        //       title: "React.PureComponent",
        //       path: "React/React.PureComponent",
        //     },
        //     { title: "解决横切关注点问题", path: "React/解决横切关注点问题" },
        //     { title: "Portals", path: "React/Portals" },
        //   ],
        // },
        // {
        //   title: "TypeScript",
        //   collapsible: true,
        //   children: [
        //     { title: "介绍", path: "TypeScript/介绍" },
        //     { title: "搭建ts开发环境", path: "TypeScript/搭建ts开发环境" },
        //     { title: "类型检查", path: "TypeScript/类型检查" },
        //     { title: "枚举", path: "TypeScript/枚举" },
        //     { title: "接口", path: "TypeScript/接口" },
        //     { title: "类型兼容性", path: "TypeScript/类型兼容性" }
        //   ],
        // },
        // {
        //   title: "webpack",
        //   collapsible: true,
        //   children: [
        //     { title: "介绍", path: "webpack/介绍" },
        //     { title: "编译过程", path: "webpack/编译过程" },
        //     { title: "入口和出口", path: "webpack/入口和出口" },
        //     { title: "loader", path: "webpack/loader" },
        //     { title: "plugin", path: "webpack/plugin" },
        //     { title: "性能优化概述", path: "webpack/性能优化概述" },
        //     {
        //       title: "构建性能-减少模块解析",
        //       path: "webpack/构建性能-减少模块解析",
        //     },
        //     {
        //       title: "构建性能-优化loader性能",
        //       path: "webpack/构建性能-优化loader性能",
        //     },
        //     { title: "构建性能-热替换", path: "webpack/构建性能-热替换" },
        //     { title: "传输性能-分包", path: "webpack/传输性能-分包" },
        //     { title: "传输性能-代码压缩", path: "webpack/传输性能-代码压缩" },
        //     {
        //       title: "传输性能-tree shaking",
        //       path: "webpack/传输性能-treeshaking",
        //     },
        //   ],
        // },
        // {
        //   title: "浏览器",
        //   collapsible: true,
        //   children: [
        //     { title: "Cookie", path: "浏览器/Cookie" },
        //     { title: "垃圾回收机制", path: "浏览器/垃圾回收机制" },
        //     { title: "浏览器工作原理", path: "浏览器/浏览器工作原理" },
        //     { title: "跨标签页通信", path: "浏览器/跨标签页通信" },
        //     { title: "浏览器中的事件循环", path: "浏览器/浏览器中的事件循环" },
        //   ],
        // },
        // {
        //   title: "计算机网络",
        //   collapsible: true,
        //   children: [
        //     { title: "五层网络模型", path: "计算机网络/五层网络模型" },
        //     { title: "常见的请求方法", path: "计算机网络/常见的请求方法" },
        //     { title: "HTTP的缓存协议", path: "计算机网络/HTTP的缓存协议" },
        //     { title: "加密", path: "计算机网络/加密" },
        //     { title: "JWT", path: "计算机网络/JWT" },
        //     { title: "跨域", path: "计算机网络/跨域" },
        //     { title: "文件上传", path: "计算机网络/文件上传" },
        //     { title: "TCP协议", path: "计算机网络/TCP协议" },
        //     { title: "CSRF攻击", path: "计算机网络/CSRF攻击" },
        //     { title: "XSS攻击", path: "计算机网络/XSS攻击" },
        //     {
        //       title: "常见的网络性能优化",
        //       path: "计算机网络/常见的网络性能优化",
        //     },
        //     { title: "断点续传", path: "计算机网络/断点续传" },
        //     { title: "域名和DNS", path: "计算机网络/域名和DNS" },
        //     { title: "SSL、TLS、HTTPS", path: "计算机网络/SSL、TLS、HTTPS" },
        //     {
        //       title: "HTTP各个版本的差异",
        //       path: "计算机网络/HTTP各个版本的差异",
        //     },
        //     { title: "WebSocket", path: "计算机网络/WebSocket" },
        //   ],
        // },
        // {
        //   title: "Node",
        //   collapsible: true,
        //   children: [
        //     { title: "介绍", path: "Node/介绍" },
        //     { title: "全局对象", path: "Node/全局对象" },
        //     { title: "文件IO", path: "Node/文件IO" },
        //     { title: "文件流", path: "Node/文件流" },
        //     { title: "Node中的事件循环", path: "Node/Node中的事件循环" },
        //   ],
        // },
        // {
        //   title: "设计模式",
        //   collapsible: true,
        //   children: [{ title: "介绍", path: "设计模式/介绍" }],
        // },
        // {
        //   title: "Docker",
        //   collapsible: true,
        //   children: [
        //     {
        //       title: "介绍",
        //       path: "Docker/介绍",
        //     },
        //     {
        //       title: "操作镜像",
        //       path: "Docker/操作镜像",
        //     },
        //     {
        //       title: "操作容器",
        //       path: "Docker/操作容器",
        //     },
        //   ],
        // },
        // {
        //   title: "Rollup",
        //   collapsible: true,
        //   children: [
        //     {
        //       title: "介绍",
        //       path: "Rollup/介绍",
        //     },
        //     {
        //       title: "Rollup常用配置",
        //       path: "Rollup/Rollup常用配置",
        //     },
        //   ],
        // },
        // {
        //   title: "前端工具链",
        //   collapsible: true,
        //   children: [
        //     {
        //       title: "Prettier",
        //       path: "前端工具链/Prettier",
        //     },
        //     {
        //       title: "ESLint",
        //       path: "前端工具链/ESLint",
        //     },
        //     {
        //       title: "Babel",
        //       path: "前端工具链/Babel",
        //     },
        //     {
        //       title: "Terser",
        //       path: "前端工具链/Terser",
        //     },
        //     {
        //       title: "SWC",
        //       path: "前端工具链/SWC",
        //     },
        //   ],
        // },
        // {
        //   title: "包管理器",
        //   collapsible: true,
        //   children: [
        //     {
        //       title: "npm",
        //       path: "包管理器/npm",
        //     },
        //     {
        //       title: "pnpm",
        //       path: "包管理器/pnpm",
        //     },
        //     {
        //       title: "monorepo&multirepo",
        //       path: "包管理器/monorepo&multirepo",
        //     },
        //     {
        //       title: "搭建monorepo工程",
        //       path: "包管理器/搭建monorepo工程",
        //     },
        //   ],
        // },
        // {
        //   title: "规范",
        //   collapsible: true,
        //   children: [
        //     {
        //       title: "VSCode代码格式化规范",
        //       path: "规范/VSCode代码格式化规范",
        //     },
        //     { title: "递归函数规范", path: "规范/递归函数规范" },
        //   ],
        // },
        // {
        //   title: "工作踩坑记录",
        //   collapsible: true,
        //   children: [
        //     {
        //       title: "ios在企业微信中无法长按识别小程序码或二维码",
        //       path: "工作踩坑记录/ios在企业微信中无法长按识别小程序码或二维码",
        //     },
        //     {
        //       title: "ios的日期格式",
        //       path: "工作踩坑记录/ios的日期格式",
        //     },
        //     {
        //       title: "Vetur1149错误",
        //       path: "工作踩坑记录/Vetur1149错误",
        //     },
        //     {
        //       title: "echarts的仪表盘在Vue3中显示异常",
        //       path: "工作踩坑记录/echarts的仪表盘在Vue3中显示异常",
        //     },
        //     {
        //       title: "Element Plus分页组件",
        //       path: "工作踩坑记录/Element Plus分页组件",
        //     },
        //     {
        //       title: "el-menu切换菜单时触发两次导航守卫",
        //       path: "工作踩坑记录/el-menu切换菜单时触发两次导航守卫",
        //     },
        //     {
        //       title: "输入中文拼音触发input事件",
        //       path: "工作踩坑记录/输入中文拼音触发input事件",
        //     },
        //   ],
        // },
      ],
      "/backend/": [
        {
          title: "简介",
          path: "introduction/",
        },
        {
          title: "Java",
          collapsible: true,
          children: [
            { title: "介绍", path: "Java/介绍" },
            { title: "数据类型", path: "Java/数据类型" },
            { title: "字面量、变量和常量", path: "Java/字面量、变量和常量" },
            { title: "类型转换", path: "Java/类型转换" },
            { title: "数组", path: "Java/数组" },
            { title: "类和对象", path: "Java/类和对象" },
            { title: "类和类的关系", path: "Java/类和类的关系" },
            { title: "修饰符", path: "Java/修饰符" },
            { title: "Java的运行机制", path: "Java/Java的运行机制" },
            {
              title: "Java面向对象的三大特征",
              path: "Java/Java面向对象的三大特征",
            },
            { title: "接口", path: "Java/接口" },
            { title: "内部类", path: "Java/内部类" },
            { title: "枚举", path: "Java/枚举" },
          ],
        },
      ],
    },
    navbar: [
      { text: "Home", link: "/" },
      { text: "前端", link: "/frontend/introduction/" },
      { text: "后端", link: "/backend/introduction/" },
      { text: "Github", link: "https://github.com/penguin0731" },
    ],
  }),
  markdown: {
    code: {
      lineNumbers: 2
    }
  }
});
