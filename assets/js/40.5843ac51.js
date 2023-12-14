(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{505:function(s,a,e){"use strict";e.r(a);var t=e(17),r=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"操作容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#操作容器"}},[s._v("#")]),s._v(" 操作容器")]),s._v(" "),e("h2",{attrs:{id:"查看正在运行的容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看正在运行的容器"}},[s._v("#")]),s._v(" 查看正在运行的容器")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[s._v("-a：查看所有容器")])]),s._v(" "),e("h2",{attrs:{id:"创建容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建容器"}},[s._v("#")]),s._v(" 创建容器")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" create imageName --name containerName\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"启动容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#启动容器"}},[s._v("#")]),s._v(" 启动容器")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" start containerName\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"创建并启动容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建并启动容器"}},[s._v("#")]),s._v(" 创建并启动容器")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -d -p myhost:containerHost --name contanerName imageName\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[s._v("-d：后台启动容器，不会阻塞终端运行")]),s._v(" "),e("li",[s._v("-p：将宿主机端口映射到容器端口，这样就可以通过宿主机的端口号来访问容器中的应用程序了")]),s._v(" "),e("li",[s._v("--name：设置容器名字")]),s._v(" "),e("li",[s._v("-e: 传递参数，如 -e API_PATH=xxx，可以替换文件中占位符为"),e("code",[s._v("$API_PATH")]),s._v("的内容")])]),s._v(" "),e("h2",{attrs:{id:"重启容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重启容器"}},[s._v("#")]),s._v(" 重启容器")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" restart containerName\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"停止容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#停止容器"}},[s._v("#")]),s._v(" 停止容器")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" stop containerName\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"删除容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#删除容器"}},[s._v("#")]),s._v(" 删除容器")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" containerName\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"进入容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#进入容器"}},[s._v("#")]),s._v(" 进入容器")]),s._v(" "),e("p",[s._v("进入容器的前提是容器已经启动。")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" -it containerName "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("command")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[s._v("-i：保持输入流，保证控制台程序能够正确识别我们的命令")]),s._v(" "),e("li",[s._v("-t：启动一个伪终端，形成我们与 bash 的交互，否则我们无法看到 bash 内部的执行结果")]),s._v(" "),e("li",[s._v("command：指定运行在终端的交互程序，如Shell、Bash，它们的命令配置分别为sh、bash，通常优先选择bash，因为它的功能比sh丰富")])]),s._v(" "),e("h2",{attrs:{id:"查看容器中的日志"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看容器中的日志"}},[s._v("#")]),s._v(" 查看容器中的日志")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" logs -f containerName\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[s._v("-f：持续监听日志输出")])])])}),[],!1,null,null,null);a.default=r.exports}}]);