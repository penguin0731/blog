(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{549:function(e,t,r){"use strict";r.r(t);var a=r(17),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"介绍"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[e._v("#")]),e._v(" 介绍")]),e._v(" "),r("p",[e._v("虚拟DOM本质就是一个js对象，用来描述视图的页面结构。")]),e._v(" "),r("p",[e._v("在Vue中，每个组件都有一个render函数，每个render函数都会返回一个虚拟DOM树，这也就意味着每个组件对应着一颗虚拟DOM树。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220409214706224.png",alt:"image-20220409214706224"}})]),e._v(" "),r("h2",{attrs:{id:"为什么需要虚拟dom"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#为什么需要虚拟dom"}},[e._v("#")]),e._v(" 为什么需要虚拟DOM？")]),e._v(" "),r("p",[e._v("在Vue中，渲染视图会调用render函数，这种渲染不仅仅在组件创建的时候触发，视图依赖的数据更新时也会触发。如果在渲染时，直接使用真实DOM的创建、更新、插入等操作，会造成重排重绘，带来大量的性能消耗，从而极大的降低渲染效率。")]),e._v(" "),r("p",[e._v("因此，在Vue渲染时，使用虚拟DOM来代替真实DOM，主要是为了解决渲染效率的问题。")]),e._v(" "),r("h2",{attrs:{id:"虚拟dom是如何转换真实dom的"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#虚拟dom是如何转换真实dom的"}},[e._v("#")]),e._v(" 虚拟DOM是如何转换真实DOM的？")]),e._v(" "),r("p",[e._v("在一个组件实例首次更改的时候，它先生成虚拟DOM树，然后根据虚拟DOM树创建真实DOM，并把真实DOM挂载到合适的位置，此时每个虚拟DOM便会对应一个真实DOM。")]),e._v(" "),r("p",[e._v("如果一个组件受响应式数据变化的影响，需要重新渲染时，它仍然会重新调用render函数，创建出一个新的虚拟DOM树，用新树和旧树对比，Vue会找到最小更新量，然后更新必要的虚拟DOM树节点，这样就保证了真实DOM达到了最小的改动。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220409215035347.png",alt:"image-20220409215035347"}})]),e._v(" "),r("h2",{attrs:{id:"模板和虚拟dom的关系"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#模板和虚拟dom的关系"}},[e._v("#")]),e._v(" 模板和虚拟DOM的关系")]),e._v(" "),r("p",[e._v("Vue中有一个compile模块，它主要负责将模板转换为render函数，而render函数调用后将得到虚拟DOM。")]),e._v(" "),r("p",[e._v("编译的过程分两步：")]),e._v(" "),r("ol",[r("li",[e._v("将模板字符串转换成为AST（抽象语法树）")]),e._v(" "),r("li",[e._v("将AST转换为render函数")])]),e._v(" "),r("p",[e._v("如果使用传统的引入方式，则编译时间发生在组件第一次加载时，我们称之为运行时编译。")]),e._v(" "),r("p",[e._v("如果是在Vue-Cli的默认配置下，编译发生在打包时，这称之为模板预编译。")]),e._v(" "),r("p",[e._v("编译是一个极其耗费性能的操作，预编译可以有效的提高运行时的性能，而且，由于运行的时候已不需要编译，Vue-Cli在打包时会排除掉Vue中的compile模块，以减少打包体积")]),e._v(" "),r("p",[e._v("模板的存在，仅仅是为了让开发人员更加方便的书写界面代码")]),e._v(" "),r("p",[r("strong",[e._v("Vue最终运行的时候，最终需要的是render函数，而不是模板，因此，模板中的各种语法，在虚拟DOM中都是不存在的，它们都会变成虚拟DOM的配置")])]),e._v(" "),r("Vssue",{attrs:{options:{labels:[e.$page.relativePath.split("/")[0]]},title:e.$page.relativePath.split("/")[1]}})],1)}),[],!1,null,null,null);t.default=s.exports}}]);