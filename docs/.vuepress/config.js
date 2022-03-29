module.exports = {
  title: "陈欣健的博客",
  description: "Just playing around",
  base: "/blog/",
  host: "localhost",
  port: "2000",
  head: [["link", { rel: "icon", href: "favicon.ico" }]],
  themeConfig: {
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
    ],
    nav: [
      { text: "Home", link: "/" },
      { text: "Exte", link: "https://google.com" },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
};
