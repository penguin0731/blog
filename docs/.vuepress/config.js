const envConfig = require("./envConfig");

const env = process.env.NODE_ENV;
const clientId = envConfig[env].clientId;
const clientSecret = envConfig[env].clientSecret;

module.exports = {
  title: "陈欣健的博客",
  description: "基于vuepress搭建的个人博客",
  base: "/blog/",
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
        hm.src = "https://hm.baidu.com/hm.js?92d7175f9322eca415c75ed0ff61d9aa";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `,
    ],
  ],
  themeConfig: {
    lastUpdated: "上次更新",
    sidebar: {
      "/frontend/": [
        {
          title: "简介",
          path: "introduction/",
        },
        {
          title: "HTML",
          collapsable: true,
          children: [
            { title: "语义化的理解", path: "HTML/语义化的理解" },
            { title: "src和href的区别", path: "HTML/src和href的区别" },
            { title: "Canvas系列：碰撞检测", path: "HTML/Canvas系列：碰撞检测" },
          ],
        },
        {
          title: "CSS",
          collapsable: true,
          children: [
            { title: "Selectors", path: "CSS/Selectors" },
            { title: "盒模型", path: "CSS/盒模型" },
            {
              title: "圣杯布局与双飞翼布局",
              path: "CSS/圣杯布局与双飞翼布局",
            },
            { title: "flex布局", path: "CSS/flex布局" },
            { title: "grid布局", path: "CSS/grid布局" },
            {
              title: "单行与多行文本的溢出处理",
              path: "CSS/单行与多行文本的溢出处理",
            },
          ],
        },
        {
          title: "JavaScript",
          collapsable: true,
          children: [
            { title: "介绍", path: "JavaScript/介绍" },
            { title: "this对象", path: "JavaScript/this对象" },
            { title: "执行上下文", path: "JavaScript/执行上下文" },
            { title: "作用域", path: "JavaScript/作用域" },
            { title: "闭包", path: "JavaScript/闭包" },
            { title: "原型与继承", path: "JavaScript/原型与继承" },
            { title: "DOM事件的传播机制", path: "JavaScript/DOM事件的传播机制" },
            { title: "【ES6+】Class", path: "JavaScript/【ES6+】Class" },
            { title: "【ES6+】Symbol", path: "JavaScript/【ES6+】Symbol" },
            { title: "【ES6+】Set与Map", path: "JavaScript/【ES6+】Set与Map" },
            { title: "【ES6+】Promise", path: "JavaScript/【ES6+】Promise" },
            { title: "【ES6+】新增的ObjectAPI", path: "JavaScript/【ES6+】新增的ObjectAPI" },
            { title: "blob下载文件", path: "JavaScript/blob下载文件" },
            { title: "前端最佳实践-判断对象是否存在某个属性", path: "JavaScript/前端最佳实践-判断对象是否存在某个属性" },
          ],
        },
        {
          title: "Vue",
          collapsable: true,
          children: [
            { title: "介绍", path: "Vue/介绍" },
            { title: "指令", path: "Vue/指令" },
            { title: "组件通信", path: "Vue/组件通信" },
            { title: "VueCli配置", path: "Vue/VueCli配置" },
            { title: "虚拟DOM", path: "Vue/虚拟DOM" },
            { title: "Vue响应式原理", path: "Vue/Vue响应式原理" },
            { title: "computed和watch", path: "Vue/computed和watch" },
            { title: "Vue的长列表优化", path: "Vue/Vue的长列表优化" },
          ],
        },
        {
          title: "Vue3",
          collapsable: true,
          children: [
            { title: "<script setup>", path: "Vue3/<script setup>" },
            { title: "Pinia", path: "Vue3/Pinia" },
            { title: "Vite vs webpack", path: "Vue3/Vite vs webpack" },
          ]
        },
        {
          title: "React",
          collapsable: true,
          children: [
            { title: "介绍", path: "React/介绍" },
            { title: "JSX", path: "React/JSX" },
            { title: "React组件", path: "React/React组件" },
            { title: "深入认识setState", path: "React/深入认识setState" },
            { title: "类组件的生命周期", path: "React/类组件的生命周期" },
            { title: "ref", path: "React/ref" },
            { title: "Context", path: "React/Context" },
            {
              title: "React.PureComponent",
              path: "React/React.PureComponent",
            },
            { title: "解决横切关注点问题", path: "React/解决横切关注点问题" },
            { title: "Portals", path: "React/Portals" },
          ],
        },
        {
          title: "TypeScript",
          collapsable: true,
          children: [{ title: "介绍", path: "TypeScript/介绍" }],
        },
        {
          title: "webpack",
          collapsable: true,
          children: [
            { title: "介绍", path: "webpack/介绍" },
            { title: "编译过程", path: "webpack/编译过程" },
            { title: "入口和出口", path: "webpack/入口和出口" },
            { title: "loader", path: "webpack/loader" },
            { title: "plugin", path: "webpack/plugin" },
            { title: "性能优化概述", path: "webpack/性能优化概述" },
            {
              title: "构建性能-减少模块解析",
              path: "webpack/构建性能-减少模块解析",
            },
            {
              title: "构建性能-优化loader性能",
              path: "webpack/构建性能-优化loader性能",
            },
            { title: "构建性能-热替换", path: "webpack/构建性能-热替换" },
            { title: "传输性能-分包", path: "webpack/传输性能-分包" },
            { title: "传输性能-代码压缩", path: "webpack/传输性能-代码压缩" },
            {
              title: "传输性能-tree shaking",
              path: "webpack/传输性能-treeshaking",
            },
          ],
        },
        {
          title: "浏览器",
          collapsable: true,
          children: [
            { title: "Cookie", path: "浏览器/Cookie" },
            { title: "浏览器的缓存策略", path: "浏览器/浏览器的缓存策略" },
            { title: "垃圾回收机制", path: "浏览器/垃圾回收机制" },
            { title: "浏览器工作原理", path: "浏览器/浏览器工作原理" },
            { title: "跨标签页通信", path: "浏览器/跨标签页通信" },
            { title: "浏览器中的事件循环", path: "浏览器/浏览器中的事件循环" },
          ],
        },
        {
          title: "计算机网络",
          collapsable: true,
          children: [
            { title: "五层网络模型", path: "计算机网络/五层网络模型" },
            { title: "常见的请求方法", path: "计算机网络/常见的请求方法" },
            { title: "加密", path: "计算机网络/加密" },
            { title: "JWT", path: "计算机网络/JWT" },
            { title: "跨域", path: "计算机网络/跨域" },
            { title: "文件上传", path: "计算机网络/文件上传" },
            { title: "TCP协议", path: "计算机网络/TCP协议" },
            { title: "CSRF攻击", path: "计算机网络/CSRF攻击" },
            { title: "XSS攻击", path: "计算机网络/XSS攻击" },
            {
              title: "常见的网络性能优化",
              path: "计算机网络/常见的网络性能优化",
            },
            { title: "断点续传", path: "计算机网络/断点续传" },
            { title: "域名和DNS", path: "计算机网络/域名和DNS" },
            { title: "SSL、TLS、HTTPS", path: "计算机网络/SSL、TLS、HTTPS" },
            {
              title: "HTTP各个版本的差异",
              path: "计算机网络/HTTP各个版本的差异",
            },
            { title: "WebSocket", path: "计算机网络/WebSocket" },
          ],
        },
        {
          title: "设计模式",
          collapsable: true,
          children: [{ title: "介绍", path: "设计模式/介绍" }],
        },
        {
          title: "规范",
          collapsable: true,
          children: [
            {
              title: "VSCode代码格式化规范",
              path: "规范/VSCode代码格式化规范",
            },
            { title: "递归函数规范", path: "规范/递归函数规范" },
          ],
        },
        {
          title: "工作踩坑记录",
          collapsable: true,
          children: [
            {
              title: "ios在企业微信中无法长按识别小程序码或二维码",
              path: "工作踩坑记录/ios在企业微信中无法长按识别小程序码或二维码",
            },
            {
              title: "ios的日期格式",
              path: "工作踩坑记录/ios的日期格式",
            },
            {
              title: "Vetur1149错误",
              path: "工作踩坑记录/Vetur1149错误",
            },
            {
              title: "echarts的仪表盘在Vue3中显示异常",
              path: "工作踩坑记录/echarts的仪表盘在Vue3中显示异常",
            },
            {
              title: "Element Plus分页组件",
              path: "工作踩坑记录/Element Plus分页组件",
            },
            {
              title: "el-menu切换菜单时触发两次导航守卫",
              path: "工作踩坑记录/el-menu切换菜单时触发两次导航守卫",
            },
          ],
        },
        {
          title: "Docker",
          collapsable: true,
          children: [
            {
              title: "介绍",
              path: "Docker/介绍"
            },
            {
              title: "操作镜像",
              path: "Docker/操作镜像"
            },
            {
              title: "操作容器",
              path: "Docker/操作容器"
            },
          ]
        }
      ],
      '/backend/': [
        {
          title: "简介",
          path: "introduction/",
        },
        {
          title: "Node",
          collapsable: true,
          children: [
            { title: "介绍", path: "Node/介绍" },
            { title: "全局对象", path: "Node/全局对象" },
            { title: "文件IO", path: "Node/文件IO" },
            { title: "文件流", path: "Node/文件流" },
            { title: "Node中的事件循环", path: "Node/Node中的事件循环" },
          ],
        },
        {
          title: "Java",
          collapsable: true,
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
            { title: "Java面向对象的三大特征", path: "Java/Java面向对象的三大特征" },
            { title: "接口", path: "Java/接口" },
            { title: "内部类", path: "Java/内部类" },
            { title: "枚举", path: "Java/枚举" },
          ],
        },
      ]
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "前端", link: "/frontend/introduction/" },
      { text: "后端", link: "/backend/introduction/" },
      { text: "Github", link: "https://github.com/penguin0731" },
    ],
  },
  markdown: {
    lineNumbers: 2,
  },
  plugins: [
    "@vuepress/active-header-links",
    "@vuepress/back-to-top",
    "vuepress-plugin-medium-zoom",
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
          content: "复制成功",
        },
      },
    ],
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp) => {
          // 不要忘了安装 moment
          const moment = require("moment");
          moment.locale("zh-CN");
          const formatStr = "YYYY年MM月DD日 HH:mm:ss"; // 日期格式化标准
          const dayDuration = moment.duration(1, "days"); // 1天的时长
          const now = moment(); // 当前时间
          const from = moment(timestamp); // 文章上次更新的时间
          return now - from > dayDuration
            ? from.format(formatStr)
            : from.fromNow();
        },
      },
    ],
    [
      "vuepress-plugin-container",
      {
        type: "vue",
        before: '<pre class="vue-container"><code>',
        after: "</code></pre>",
      },
    ],
  ],
};
