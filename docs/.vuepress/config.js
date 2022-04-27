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
  head: [["link", { rel: "icon", href: "favicon.ico" }]],
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
          { title: "ES6之新增的Object API", path: "/JavaScript/ES6之新增的Object API" },
          { title: "blob下载文件", path: "/JavaScript/blob下载文件" }
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
          { title: "浏览器的缓存策略", path: "/浏览器/浏览器的缓存策略" },
          { title: "垃圾回收机制", path: "/浏览器/垃圾回收机制" },
        ],
      },
      {
        title: "计算机网络",
        collapsable: true,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
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
    lineNumbers: true,
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
  ],
};
