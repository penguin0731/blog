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
        collapsable: false,
        children: [{ title: "盒模型", path: "/HTML/盒模型" }],
      },
      {
        title: "CSS",
        collapsable: false,
        children: [
          {
            title: "圣杯布局与双飞翼布局",
            path: "/CSS/圣杯布局与双飞翼布局",
          },
          {
            title: "单行与多行文本的溢出处理",
            path: "/CSS/单行与多行文本的溢出处理",
          },
        ],
      },
      {
        title: "JavaScript",
        collapsable: false,
        children: [{ title: "介绍", path: "/JavaScript/介绍" }],
      },
      {
        title: "Vue",
        collapsable: false,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "React",
        collapsable: false,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "TypeScript",
        collapsable: false,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "webpack",
        collapsable: false,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "规范",
        collapsable: false,
        children: [
          { title: "VSCode代码格式化规范", path: "/规范/VSCode代码格式化规范" },
        ],
      },
      {
        title: "工作踩坑记录",
        collapsable: false,
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
  plugins: ["@vuepress/active-header-links", "@vuepress/back-to-top"],
};
