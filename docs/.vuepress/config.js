module.exports = {
  title: "陈欣健的博客",
  description: "Just playing around",
  base: "/blog/",
  host: "localhost",
  port: "2000",
  head: ["link", { rel: "icon", href: "favicon.ico" }],
  themeConfig: {
    sidebar: [
      {
        title: "简介",
        path: "/introduction/",
      },
      {
        title: "html",
        collapsable: false,
        children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "css",
        collapsable: false,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "javascript",
        collapsable: false,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "vue",
        collapsable: false,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "react",
        collapsable: false,
        // children: [{ title: "盒模型", path: "/html/盒模型" }],
      },
      {
        title: "typescript",
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
