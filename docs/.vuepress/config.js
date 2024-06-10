import { defineUserConfig } from 'vuepress'
import envConfig from './envConfig';
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

const env = process.env.NODE_ENV;
const clientId = envConfig[env].clientId;
const clientSecret = envConfig[env].clientSecret;

module.exports = defineUserConfig({
  bundler: viteBundler(),
  text: "陈欣健的博客",
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
        {
          text: "JavaScript",
          prefix: 'JavaScript',
          collapsible: true,
          children: [
            '介绍',
            'this对象',
            '执行上下文',
            '作用域',
            '闭包',
            '原型与继承',
            'DOM事件的传播机制',
            '【ES6+】Class',
            '【ES6+】Symbol',
            '【ES6+】Set与Map',
            '【ES6+】Promise',
            '【ES6+】新增的ObjectAPI',
            'blob下载文件',
            '前端最佳实践-判断对象是否存在某个属性',
            '前端最佳实践-类型检测',
            '浮点数精度问题',
          ],
        },
        {
          text: "Vue",
          prefix: 'Vue',
          collapsible: true,
          children: [
            '介绍',
            '指令',
            '组件通信',
            'VueCli配置',
            '虚拟DOM',
            'Vue响应式原理',
            'computed和watch',
            'Vue的长列表优化',
          ],
        },
        {
          text: "Vue3",
          prefix: 'Vue3',
          collapsible: true,
          children: [
           'Vue3 和 Vue2 的区别',
            '<script setup>',
            'Pinia',
            'Vite vs webpack',
          ],
        },
        {
          text: "React",
          prefix: "React",
          collapsible: true,
          children: [
            '介绍',
            'JSX',
            'React组件',
            '深入认识setState',
            '类组件的生命周期',
           'ref',
            'Context',
            'React.PureComponent',
            '解决横切关注点问题',
            'Portals',
          ],
        },
        {
          text: "TypeScript",
          prefix: "TypeScript",
          collapsible: true,
          children: [
            '介绍',
            '搭建ts开发环境',
           '类型检查',
            '枚举',
            '接口',
            '类型兼容性'
          ],
        },
        {
          text: "webpack",
          prefix: "webpack",
          collapsible: true,
          children: [
            '介绍',
            '编译过程',
            '入口和出口',
            'loader',
            'plugin',
            '性能优化概述',
            '构建性能-减少模块解析',
            '构建性能-优化loader性能',
            '构建性能-热替换',
            '传输性能-分包',
            '传输性能-代码压缩',
            '传输性能-treeshaking',
          ],
        },
        {
          text: "浏览器",
          prefix: "浏览器",
          collapsible: true,
          children: [
            'Cookie',
            '垃圾回收机制',
            '浏览器工作原理',
            '跨标签页通信',
            '浏览器中的事件循环',
          ],
        },
        {
          text: "计算机网络",
          prefix: "计算机网络",
          collapsible: true,
          children: [
            '五层网络模型',
            '常见的请求方法',
            'HTTP的缓存协议',
            '加密',
            'JWT',
            '跨域',
            '文件上传',
            'TCP协议',
            'CSRF攻击',
            'XSS攻击',
            '常见的网络性能优化',
            '断点续传',
            '域名和DNS',
            'SSL、TLS、HTTPS',
            'HTTP各个版本的差异',
            'WebSocket',
          ],
        },
        {
          text: "Node",
          prefix: "Node",
          collapsible: true,
          children: [
            '介绍',
            '全局对象',
            '文件IO',
            '文件流',
            'Node中的事件循环',
          ],
        },
        {
          text: "设计模式",
          prefix: "设计模式",
          collapsible: true,
          children: ['介绍'],
        },
        {
          text: "Docker",
          prefix: "Docker",
          collapsible: true,
          children: [
            '介绍',
            '操作镜像',
            '操作容器',
          ],
        },
        {
          text: "Rollup",
          prefix: "Rollup",
          collapsible: true,
          children: [
            '介绍',
            'Rollup常用配置',
          ],
        },
        {
          text: "前端工具链",
          prefix: "前端工具链",
          collapsible: true,
          children: [
            'Prettier',
            'ESLint',
            'Babel',
            'Terser',
            'SWC',
          ],
        },
        {
          text: "包管理器",
          prefix: "包管理器",
          collapsible: true,
          children: [
            'npm',
            'pnpm',
            'monorepo&multirepo',
            '搭建monorepo工程',
          ],
        },
        {
          text: "规范",
          prefix: "规范",
          collapsible: true,
          children: [
            'VSCode代码格式化规范',
            '递归函数规范',
          ],
        },
        {
          text: "工作踩坑记录",
          prefix: "工作踩坑记录",
          collapsible: true,
          children: [
            'ios在企业微信中无法长按识别小程序码或二维码',
            'ios的日期格式',
            'Vetur1149错误',
            'echarts的仪表盘在Vue3中显示异常',
            'Element Plus分页组件',
            'el-menu切换菜单时触发两次导航守卫',
            '输入中文拼音触发input事件',
          ],
        },
      ],
      "/backend/": [
        'introduction/',
        {
          text: "Java",
          prefix: "Java",
          collapsible: true,
          children: [
            '介绍',
            '数据类型',
            '字面量、变量和常量',
            '类型转换',
            '数组',
            '类和对象',
            '类和类的关系',
            '修饰符',
           'Java的运行机制',
            'Java面向对象的三大特征',
            '接口',
            '内部类',
            '枚举',
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
