import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "🧸陈欣健的博客",
  description: "基于vitepress搭建的个人博客",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
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
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    lastUpdated: {
      text: '最近更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }
    },
    returnToTopLabel: '返回顶部',
    footer: {
      copyright: '<a href="https://beian.miit.gov.cn/">粤ICP备2025398934号</a>',
      message: 'MIT Licensed | Copyright © 2025-present akitadoge2020'
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Frontend', link: '/frontend/introduction/' },
      { text: 'Backend', link: '/backend/introduction/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/akitadoge2020' }
    ],
    sidebar: {
      "/frontend/": [
        { text: "introduction", link: "/frontend/introduction/" },
        {
          text: "HTML",
          collapsed: true,
          items: [
            { text: "语义化的理解", link: "/frontend/HTML/语义化的理解" },
            { text: "src和href的区别", link: "/frontend/HTML/src和href的区别" },
            {
              text: "Canvas系列：碰撞检测",
              link: "/frontend/HTML/Canvas系列：碰撞检测",
            },
          ],
        },
        {
          text: "CSS",
          collapsed: true,
          items: [
            { text: "Selectors", link: "/frontend/CSS/Selectors" },
            { text: "盒模型", link: "/frontend/CSS/盒模型" },
            {
              text: "圣杯布局与双飞翼布局",
              link: "/frontend/CSS/圣杯布局与双飞翼布局",
            },
            { text: "flex布局", link: "/frontend/CSS/flex布局" },
            { text: "grid布局", link: "/frontend/CSS/grid布局" },
            {
              text: "单行与多行文本的溢出处理",
              link: "/frontend/CSS/单行与多行文本的溢出处理",
            },
            { text: "CSS工程化", link: "/frontend/CSS/CSS工程化" },
            { text: "Sass", link: "/frontend/CSS/Sass" },
            { text: "Postcss", link: "/frontend/CSS/Postcss" },
          ],
        },
        {
          text: "JavaScript",
          collapsed: true,
          items: [
            { text: "介绍", link: "/frontend/JavaScript/介绍" },
            { text: "this对象", link: "/frontend/JavaScript/this对象" },
            { text: "执行上下文", link: "/frontend/JavaScript/执行上下文" },
            { text: "作用域", link: "/frontend/JavaScript/作用域" },
            { text: "闭包", link: "/frontend/JavaScript/闭包" },
            { text: "原型与继承", link: "/frontend/JavaScript/原型与继承" },
            {
              text: "DOM事件的传播机制",
              link: "/frontend/JavaScript/DOM事件的传播机制",
            },
            { text: "【ES6+】Class", link: "/frontend/JavaScript/【ES6+】Class" },
            { text: "【ES6+】Symbol", link: "/frontend/JavaScript/【ES6+】Symbol" },
            { text: "【ES6+】Set与Map", link: "/frontend/JavaScript/【ES6+】Set与Map" },
            { text: "【ES6+】Promise", link: "/frontend/JavaScript/【ES6+】Promise" },
            {
              text: "【ES6+】新增的ObjectAPI",
              link: "/frontend/JavaScript/【ES6+】新增的ObjectAPI",
            },
            { text: "blob下载文件", link: "/frontend/JavaScript/blob下载文件" },
            {
              text: "前端最佳实践-判断对象是否存在某个属性",
              link: "/frontend/JavaScript/前端最佳实践-判断对象是否存在某个属性",
            },
            {
              text: "前端最佳实践-类型检测",
              link: "/frontend/JavaScript/前端最佳实践-类型检测",
            },
            { text: "浮点数精度问题", link: "/frontend/JavaScript/浮点数精度问题" },
          ],
        },
        {
          text: "Vue",
          collapsed: true,
          items: [
            { text: "介绍", link: "/frontend/Vue/介绍" },
            { text: "指令", link: "/frontend/Vue/指令" },
            { text: "组件通信", link: "/frontend/Vue/组件通信" },
            { text: "VueCli配置", link: "/frontend/Vue/VueCli配置" },
            { text: "虚拟DOM", link: "/frontend/Vue/虚拟DOM" },
            { text: "Vue响应式原理", link: "/frontend/Vue/Vue响应式原理" },
            { text: "computed和watch", link: "/frontend/Vue/computed和watch" },
            { text: "Vue的长列表优化", link: "/frontend/Vue/Vue的长列表优化" },
          ],
        },
        {
          text: "Vue3",
          collapsed: true,
          items: [
            { text: "Vue3 和 Vue2 的区别", link: "/frontend/Vue3/Vue3 和 Vue2 的区别" },
            // text字段不支持<>,会导致刷新时页面空白
            { text: "script setup", link: "/frontend/Vue3/<script setup>" },
            { text: "Pinia", link: "/frontend/Vue3/Pinia" },
            { text: "Vite vs webpack", link: "/frontend/Vue3/Vite vs webpack" },
          ],
        },
        {
          text: "React",
          collapsed: true,
          items: [
            { text: "介绍", link: "/frontend/React/介绍" },
            { text: "JSX", link: "/frontend/React/JSX" },
            { text: "React组件", link: "/frontend/React/React组件" },
            { text: "深入认识setState", link: "/frontend/React/深入认识setState" },
            { text: "类组件的生命周期", link: "/frontend/React/类组件的生命周期" },
            { text: "ref", link: "/frontend/React/ref" },
            { text: "Context", link: "/frontend/React/Context" },
            {
              text: "React.PureComponent",
              link: "/frontend/React/React.PureComponent",
            },
            { text: "解决横切关注点问题", link: "/frontend/React/解决横切关注点问题" },
            { text: "Portals", link: "/frontend/React/Portals" },
          ],
        },
        {
          text: "TypeScript",
          collapsed: true,
          items: [
            { text: "介绍", link: "/frontend/TypeScript/介绍" },
            { text: "搭建ts开发环境", link: "/frontend/TypeScript/搭建ts开发环境" },
            { text: "类型检查", link: "/frontend/TypeScript/类型检查" },
            { text: "枚举", link: "/frontend/TypeScript/枚举" },
            { text: "接口", link: "/frontend/TypeScript/接口" },
            { text: "泛型", link: "/frontend/TypeScript/泛型" }
          ],
        },
        {
          text: "webpack",
          collapsed: true,
          items: [
            { text: "介绍", link: "/frontend/webpack/介绍" },
            { text: "编译过程", link: "/frontend/webpack/编译过程" },
            { text: "入口和出口", link: "/frontend/webpack/入口和出口" },
            { text: "loader", link: "/frontend/webpack/loader" },
            { text: "plugin", link: "/frontend/webpack/plugin" },
            { text: "性能优化概述", link: "/frontend/webpack/性能优化概述" },
            {
              text: "构建性能-减少模块解析",
              link: "/frontend/webpack/构建性能-减少模块解析",
            },
            {
              text: "构建性能-优化loader性能",
              link: "/frontend/webpack/构建性能-优化loader性能",
            },
            { text: "构建性能-热替换", link: "/frontend/webpack/构建性能-热替换" },
            { text: "传输性能-分包", link: "/frontend/webpack/传输性能-分包" },
            { text: "传输性能-代码压缩", link: "/frontend/webpack/传输性能-代码压缩" },
            {
              text: "传输性能-tree shaking",
              link: "/frontend/webpack/传输性能-treeshaking",
            },
          ],
        },
        {
          text: "浏览器",
          collapsed: true,
          items: [
            { text: "Cookie", link: "/frontend/浏览器/Cookie" },
            { text: "垃圾回收机制", link: "/frontend/浏览器/垃圾回收机制" },
            { text: "浏览器工作原理", link: "/frontend/浏览器/浏览器工作原理" },
            { text: "跨标签页通信", link: "/frontend/浏览器/跨标签页通信" },
            { text: "浏览器中的事件循环", link: "/frontend/浏览器/浏览器中的事件循环" },
            { text: "浏览器的缓存策略", link: "/frontend/浏览器/浏览器的缓存策略" }
          ],
        },
        {
          text: "计算机网络",
          collapsed: true,
          items: [
            { text: "五层网络模型", link: "/frontend/计算机网络/五层网络模型" },
            { text: "常见的请求方法", link: "/frontend/计算机网络/常见的请求方法" },
            { text: "HTTP的缓存协议", link: "/frontend/计算机网络/HTTP的缓存协议" },
            { text: "加密", link: "/frontend/计算机网络/加密" },
            { text: "JWT", link: "/frontend/计算机网络/JWT" },
            { text: "跨域", link: "/frontend/计算机网络/跨域" },
            { text: "文件上传", link: "/frontend/计算机网络/文件上传" },
            { text: "TCP协议", link: "/frontend/计算机网络/TCP协议" },
            { text: "CSRF攻击", link: "/frontend/计算机网络/CSRF攻击" },
            { text: "XSS攻击", link: "/frontend/计算机网络/XSS攻击" },
            {
              text: "常见的网络性能优化",
              link: "/frontend/计算机网络/常见的网络性能优化",
            },
            { text: "断点续传", link: "/frontend/计算机网络/断点续传" },
            { text: "域名和DNS", link: "/frontend/计算机网络/域名和DNS" },
            { text: "SSL、TLS、HTTPS", link: "/frontend/计算机网络/SSL、TLS、HTTPS" },
            {
              text: "HTTP各个版本的差异",
              link: "/frontend/计算机网络/HTTP各个版本的差异",
            },
            { text: "WebSocket", link: "/frontend/计算机网络/WebSocket" },
          ],
        },
        {
          text: "Node",
          collapsed: true,
          items: [
            { text: "介绍", link: "/frontend/Node/介绍" },
            { text: "全局对象", link: "/frontend/Node/全局对象" },
            { text: "文件IO", link: "/frontend/Node/文件IO" },
            { text: "文件流", link: "/frontend/Node/文件流" },
            { text: "Node中的事件循环", link: "/frontend/Node/Node中的事件循环" },
          ],
        },
        {
          text: "设计模式",
          collapsed: true,
          items: [{ text: "介绍", link: "/frontend/设计模式/介绍" }],
        },
        {
          text: "Docker",
          collapsed: true,
          items: [
            {
              text: "介绍",
              link: "/frontend/Docker/介绍",
            },
            {
              text: "操作镜像",
              link: "/frontend/Docker/操作镜像",
            },
            {
              text: "操作容器",
              link: "/frontend/Docker/操作容器",
            },
          ],
        },
        {
          text: "Rollup",
          collapsed: true,
          items: [
            {
              text: "介绍",
              link: "/frontend/Rollup/介绍",
            },
            {
              text: "Rollup常用配置",
              link: "/frontend/Rollup/Rollup常用配置",
            },
          ],
        },
        {
          text: "前端工具链",
          collapsed: true,
          items: [
            {
              text: "Prettier",
              link: "/frontend/前端工具链/Prettier",
            },
            {
              text: "ESLint",
              link: "/frontend/前端工具链/ESLint",
            },
            {
              text: "Babel",
              link: "/frontend/前端工具链/Babel",
            },
            {
              text: "Terser",
              link: "/frontend/前端工具链/Terser",
            },
            {
              text: "SWC",
              link: "/frontend/前端工具链/SWC",
            },
          ],
        },
        {
          text: "包管理器",
          collapsed: true,
          items: [
            {
              text: "npm",
              link: "/frontend/包管理器/npm",
            },
            {
              text: "pnpm",
              link: "/frontend/包管理器/pnpm",
            },
            {
              text: "monorepo&multirepo",
              link: "/frontend/包管理器/monorepo&multirepo",
            },
            {
              text: "搭建monorepo工程",
              link: "/frontend/包管理器/搭建monorepo工程",
            },
          ],
        },
        {
          text: "规范",
          collapsed: true,
          items: [
            {
              text: "VSCode代码格式化规范",
              link: "/frontend/规范/VSCode代码格式化规范",
            },
            { text: "递归函数规范", link: "/frontend/规范/递归函数规范" },
          ],
        },
        {
          text: "工作踩坑记录",
          collapsed: true,
          items: [
            {
              text: "ios在企业微信中无法长按识别小程序码或二维码",
              link: "/frontend/工作踩坑记录/ios在企业微信中无法长按识别小程序码或二维码",
            },
            {
              text: "ios的日期格式",
              link: "/frontend/工作踩坑记录/ios的日期格式",
            },
            {
              text: "Vetur1149错误",
              link: "/frontend/工作踩坑记录/Vetur1149错误",
            },
            {
              text: "echarts的仪表盘在Vue3中显示异常",
              link: "/frontend/工作踩坑记录/echarts的仪表盘在Vue3中显示异常",
            },
            {
              text: "Element Plus分页组件",
              link: "/frontend/工作踩坑记录/Element Plus分页组件",
            },
            {
              text: "el-menu切换菜单时触发两次导航守卫",
              link: "/frontend/工作踩坑记录/el-menu切换菜单时触发两次导航守卫",
            },
            {
              text: "输入中文拼音触发input事件",
              link: "/frontend/工作踩坑记录/输入中文拼音触发input事件",
            },
            {
              text: "Vue3+Vite兼容旧版浏览器",
              link: "/frontend/工作踩坑记录/Vue3+Vite兼容旧版浏览器",
            },
            {
              text: "electron自动登录问题",
              link: "/frontend/工作踩坑记录/electron自动登录问题"
            },
            {
              text: "多个子元素在父容器中动态排列问题",
              link: "/frontend/工作踩坑记录/多个子元素在父容器中动态排列问题"
            },
            {
              text: "ios微信h5唤起app问题",
              link: "/frontend/工作踩坑记录/ios微信h5唤起app问题"
            },
            {
              text: "antDesignVue封装方法型组件问题",
              link: "/frontend/工作踩坑记录/antDesignVue封装方法型组件问题"
            },
          ],
        },
      ],
      "/backend/": [
        { text: "introduction", link: "/backend/introduction/" },
        {
          text: "Java",
          collapsed: true,
          items: [
            { text: '介绍', link: '/backend/Java/介绍.md' },
            { text: "数据类型", link: "/backend/Java/数据类型" },
            { text: "字面量、变量和常量", link: "/backend/Java/字面量、变量和常量" },
            { text: "类型转换", link: "/backend/Java/类型转换" },
            { text: "数组", link: "/backend/Java/数组" },
            { text: "类和对象", link: "/backend/Java/类和对象" },
            { text: "类和类的关系", link: "/backend/Java/类和类的关系" },
            { text: "修饰符", link: "/backend/Java/修饰符" },
            { text: "Java的运行机制", link: "/backend/Java/Java的运行机制" },
            {
              text: "Java面向对象的三大特征",
              link: "/backend/Java/Java面向对象的三大特征",
            },
            { text: "接口", link: "/backend/Java/接口" },
            { text: "内部类", link: "/backend/Java/内部类" },
            { text: "枚举", link: "/backend/Java/枚举" },
          ],
        },
      ],
    }
  },
  markdown: {
    lineNumbers: true,
    math: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
  lastUpdated: true
})
