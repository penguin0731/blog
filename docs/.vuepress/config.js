let clientId = "";
let clientSecret = "";
if (process.env.NODE_ENV === "development") {
  clientId = "ee29e2f37130ab84703c";
  clientSecret = "f943dbc170495b6fcb680fe3ee061355754aa6ae";
} else if (process.env.NODE_ENV === "production") {
  clientId = "30a96024fdc7f2fe29f3";
  clientSecret = "2b24e3080172384f54948392a9a6fc556144c3f1";
}
module.exports = {
  title: "陈欣健的博客",
  description: "Just playing around",
  base: "/blog/",
  host: "localhost",
  port: "2000",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    // 引入百度统计代码
    ["script", {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?92d7175f9322eca415c75ed0ff61d9aa";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ],
  themeConfig: {
    lastUpdated: "上次更新",
    sidebar: [
      {
        title: "简介",
        path: "/introduction/",
      },
      {
        title: "HTML",
        collapsable: true,
        children: [{ title: "盒模型", path: "/HTML/盒模型" }],
      },
      {
        title: "CSS",
        collapsable: true,
        children: [
          {
            title: "Selectors",
            path: "/CSS/Selectors",
          },
          {
            title: "圣杯布局与双飞翼布局",
            path: "/CSS/圣杯布局与双飞翼布局",
          },
          {
            title: "flex布局",
            path: "/CSS/flex布局",
          },
          {
            title: "单行与多行文本的溢出处理",
            path: "/CSS/单行与多行文本的溢出处理",
          },
        ],
      },
      {
        title: "JavaScript",
        collapsable: true,
        children: [
          { title: "介绍", path: "/JavaScript/介绍" },
          { title: "原型与继承", path: "/JavaScript/原型与继承" },
          { title: "ES6之Class", path: "/JavaScript/ES6之Class" },
          { title: "ES6之Symbol", path: "/JavaScript/ES6之Symbol" },
          { title: "ES6之Set与Map", path: "/JavaScript/ES6之Set与Map" },
          { title: "ES6之Promise", path: "/JavaScript/ES6之Promise" },
          { title: "ES6之新增的Object API", path: "/JavaScript/ES6之新增的Object API" },
          { title: "blob下载文件", path: "/JavaScript/blob下载文件" },
          { title: "事件循环EventLoop", path: "/JavaScript/事件循环EventLoop" }
        ],
      },
      {
        title: "Vue",
        collapsable: true,
        children: [
          { title: "介绍", path: "/Vue/介绍" },
          { title: "指令", path: "/Vue/指令" },
          { title: "VueCli配置", path: "/Vue/VueCli配置" },
          { title: "虚拟Dom", path: "/Vue/虚拟Dom" },
          { title: "Vue响应式原理", path: "/Vue/Vue响应式原理" },
        ],
      },
      {
        title: "React",
        collapsable: true,
        children: [
          { title: "介绍", path: "/React/介绍" },
          { title: "JSX", path: "/React/JSX" },
        ],
      },
      {
        title: "TypeScript",
        collapsable: true,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "webpack",
        collapsable: true,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "浏览器",
        collapsable: true,
        children: [
          { title: "Cookie", path: "/浏览器/Cookie" },
          { title: "浏览器的缓存策略", path: "/浏览器/浏览器的缓存策略" },
          { title: "垃圾回收机制", path: "/浏览器/垃圾回收机制" },
          { title: "浏览器工作原理", path: "/浏览器/浏览器工作原理" },
          { title: "跨标签页通信", path: "/浏览器/跨标签页通信" },
        ],
      },
      {
        title: "计算机网络",
        collapsable: true,
        children: [
          { title: "五层网络模型", path: "/计算机网络/五层网络模型" },
          { title: "常见的请求方法", path: "/计算机网络/常见的请求方法" },
          { title: "加密", path: "/计算机网络/加密" },
          { title: "JWT", path: "/计算机网络/JWT" },
          { title: "跨域", path: "/计算机网络/跨域" },
          { title: "文件上传", path: "/计算机网络/文件上传" },
          { title: "TCP协议", path: "/计算机网络/TCP协议" },
          { title: "CSRF攻击", path: "/计算机网络/CSRF攻击" },
          { title: "XSS攻击", path: "/计算机网络/XSS攻击" },
          { title: "常见的网络性能优化", path: "/计算机网络/常见的网络性能优化" },
          { title: "断点续传", path: "/计算机网络/断点续传" },
          { title: "域名和DNS", path: "/计算机网络/域名和DNS" },
          { title: "SSL、TLS、HTTPS", path: "/计算机网络/SSL、TLS、HTTPS" },
          { title: "HTTP各个版本的差异", path: "/计算机网络/HTTP各个版本的差异" },
        ],
      },
      {
        title: "规范",
        collapsable: true,
        children: [
          { title: "VSCode代码格式化规范", path: "/规范/VSCode代码格式化规范" },
          { title: "递归函数规范", path: "/规范/递归函数规范" },
        ],
      },
      {
        title: "工作踩坑记录",
        collapsable: true,
        children: [
          {
            title: "ios在企业微信中无法长按识别小程序码或二维码",
            path: "/工作踩坑记录/ios在企业微信中无法长按识别小程序码或二维码",
          },
          {
            title: "ios的日期格式",
            path: "/工作踩坑记录/ios的日期格式",
          },
          {
            title: "Vetur1149错误",
            path: "/工作踩坑记录/Vetur1149错误",
          },
        ],
      },
    ],
    nav: [
      { text: "Home", link: "/" },
      { text: "Github", link: "https://github.com/penguin0731" },
    ],
  },
  markdown: {
    lineNumbers: 2,
  },
  plugins: [
    "@vuepress/active-header-links",
    "@vuepress/back-to-top",
    [
      "@vssue/vuepress-plugin-vssue",
      {
        // 设置 `platform` 而不是 `api`
        platform: "github",
        // 其他的 Vssue 配置
        owner: "penguin0731",
        repo: "blog",
        clientId,
        clientSecret,
        locale: "zh-CN",
      },
    ],
    [
      "vuepress-plugin-nuggets-style-copy",
      {
        copyText: "复制代码",
        tip: {
          content: "复制成功"
        }
      }
    ],
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp) => {
          // 不要忘了安装 moment
          const moment = require("moment");
          moment.locale("zh-CN");
          const formatStr = "YYYY年MM月DD日 HH:mm:ss"; // 日期格式化标准
          const dayDuration = moment.duration(1, 'days'); // 1天的时长
          const now = moment(); // 当前时间
          const from = moment(timestamp); // 文章上次更新的时间
          return now - from > dayDuration ? from.format(formatStr) : from.fromNow();
        }
      }
    ]
  ],
};
