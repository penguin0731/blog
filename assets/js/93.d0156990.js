(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{556:function(s,t,a){"use strict";a.r(t);var e=a(17),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"代码压缩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码压缩"}},[s._v("#")]),s._v(" 代码压缩")]),s._v(" "),a("ol",[a("li",[a("strong",[s._v("为什么要进行代码压缩？")])])]),s._v(" "),a("p",[s._v("减少代码体积；破坏代码可读性，提升破解成本。")]),s._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("strong",[s._v("什么时候进行代码压缩？")])])]),s._v(" "),a("p",[s._v("生产环境。")]),s._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("strong",[s._v("如何进行代码压缩？")])])]),s._v(" "),a("p",[s._v("使用压缩工具。目前流行的压缩工具有两种："),a("code",[s._v("UglifyJs")]),s._v("和"),a("code",[s._v("Terser")]),s._v("。")]),s._v(" "),a("p",[a("code",[s._v("UglifyJs")]),s._v("是一个传统的代码压缩工具，已存在多年，曾经是前端应用的必备工具，但由于它不支持"),a("code",[s._v("ES6")]),s._v("语法，所以目前的流行度已有所下降。")]),s._v(" "),a("p",[a("code",[s._v("Terser")]),s._v("是一个新起的代码压缩工具，支持"),a("code",[s._v("ES6+")]),s._v("语法，因此被很多构建工具内置使用。"),a("code",[s._v("webpack")]),s._v("安装后会内置"),a("code",[s._v("Terser")]),s._v("，当启用生产环境后即可用其进行代码压缩。")]),s._v(" "),a("p",[s._v("因此，我们选择"),a("code",[s._v("Terser")]),s._v("。")]),s._v(" "),a("h2",{attrs:{id:"terser"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#terser"}},[s._v("#")]),s._v(" Terser")]),s._v(" "),a("p",[s._v("在"),a("code",[s._v("Terser")]),s._v("的"),a("a",{attrs:{href:"https://terser.org/",target:"_blank",rel:"noopener noreferrer"}},[s._v("官网"),a("OutboundLink")],1),s._v("可尝试它的压缩效果。")]),s._v(" "),a("p",[s._v("webpack自动集成了"),a("code",[s._v("Terser")]),s._v("，使用方式如下：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" TerserPlugin "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'terser-webpack-plugin'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" OptimizeCSSAssetsPlugin "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'optimize-css-assets-webpack-plugin'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("optimization")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 是否要启用压缩，默认情况下，生产环境会自动开启")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("minimize")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("minimizer")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 压缩时使用的插件，可以有多个")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("TerserPlugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("OptimizeCSSAssetsPlugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("Vssue",{attrs:{options:{labels:[s.$page.relativePath.split("/")[0]]},title:s.$page.relativePath.split("/")[1]}})],1)}),[],!1,null,null,null);t.default=n.exports}}]);