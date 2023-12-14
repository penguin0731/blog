(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{598:function(t,v,s){"use strict";s.r(v);var _=s(17),a=Object(_.a)({},(function(){var t=this,v=t.$createElement,s=t._self._c||v;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"ssl、tls、https"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ssl、tls、https"}},[t._v("#")]),t._v(" SSL、TLS、HTTPS")]),t._v(" "),s("p",[t._v("SSL（Secure Sockets Layer），安全套接字协议。")]),t._v(" "),s("p",[t._v("TLS（Transport Layer Security），传输层安全性协议。")]),t._v(" "),s("p",[s("strong",[t._v("TLS是SSL的升级版，两者几乎是一样的。")])]),t._v(" "),s("p",[t._v("HTTPS（Hyper Text Transfer Protocol over Secure Socket Layer），建立在SSL/TLS协议之上的HTTP协议。")]),t._v(" "),s("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220603143333120.png",alt:"image-20220603143333120"}}),t._v(" "),s("h2",{attrs:{id:"https验证身份的过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#https验证身份的过程"}},[t._v("#")]),t._v(" HTTPS验证身份的过程")]),t._v(" "),s("p",[t._v("首先，使用HTTPS协议需要向CA（Certificate Authority，证书颁发机构）申请证书，需要一定的费用，免费证书也有，但是很少且有效期通常只有一年。每个CA都有各自的公钥和私钥，公钥是公开的，私钥是CA自己保存的。")]),t._v(" "),s("p",[t._v("颁发的证书主要有以下几个部分：")]),t._v(" "),s("ul",[s("li",[t._v("服务器地址")]),t._v(" "),s("li",[t._v("颁发证书的机构")]),t._v(" "),s("li",[t._v("由CA私钥加密的服务器公钥key")]),t._v(" "),s("li",[t._v("由CA私钥加密的证书签名")])]),t._v(" "),s("p",[t._v("其中，服务器公钥key和证书签名需要使用CA的公钥解密获得，但由于没有CA的私钥，因此无法进行篡改伪造。")]),t._v(" "),s("p",[t._v("证书签名 = 服务器地址 + CA公钥 + 服务器公钥，证书签名的算法是公开的，它出现的目的，是为了让每一个拿到证书的终端，可以验证签名是否被篡改。")]),t._v(" "),s("p",[t._v("HTTPS验证身份的过程如下：")]),t._v(" "),s("ol",[s("li",[t._v("客户端请求服务器，并告诉服务器自身支持的加密算法以及密钥长度等信息")]),t._v(" "),s("li",[t._v("服务器响应公钥和服务器证书")]),t._v(" "),s("li",[t._v("客户端验证证书是否合法，然后生成一个会话密钥，并用服务器公钥将会话密钥进行加密，把加密的结果通过请求发送给服务器")]),t._v(" "),s("li",[t._v("服务器使用私钥解密被加密的会话密钥并保存起来，然后使用会话密钥加密消息响应给客户端，表示自己已经准备就绪")]),t._v(" "),s("li",[t._v("客户端使用会话密钥解密消息，知道了服务器已经准备就绪。")]),t._v(" "),s("li",[t._v("后续客户端和服务器使用会话密钥加密信息传递消息")])]),t._v(" "),s("h2",{attrs:{id:"https的握手过程中-客户端如何验证证书的合法性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#https的握手过程中-客户端如何验证证书的合法性"}},[t._v("#")]),t._v(" HTTPS的握手过程中，客户端如何验证证书的合法性？")]),t._v(" "),s("ol",[s("li",[t._v("校验证书的颁发机构是否受客户端信任")]),t._v(" "),s("li",[t._v("通过 CRL 或 OCSP 的方式校验证书是否被吊销")]),t._v(" "),s("li",[t._v("对比系统时间，校验证书是否在有效期内")]),t._v(" "),s("li",[t._v("通过校验对方是否存在证书的私钥，判断证书的网站域名是否与证书颁发的域名一致")])]),t._v(" "),s("h2",{attrs:{id:"为什么需要ca机构对证书签名"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#为什么需要ca机构对证书签名"}},[t._v("#")]),t._v(" 为什么需要CA机构对证书签名？")]),t._v(" "),s("p",[t._v("主要是为了解决证书的可信问题。如果没有权威机构对证书进行签名，客户端就无法知晓证书是否是伪造的，从而增加了中间人攻击的风险，https 就变得毫无意义。")]),t._v(" "),s("h2",{attrs:{id:"https攻击"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#https攻击"}},[t._v("#")]),t._v(" HTTPS攻击")]),t._v(" "),s("p",[t._v("HTTPS攻击主要分为SSL劫持攻击和SSL剥离攻击两种。")]),t._v(" "),s("p",[t._v("SSL 劫持攻击是指攻击者劫持了客户端和服务器之间的连接，将服务器的合法证书替换为伪造的证书，从而获取客户端和服务器之间传递的信息。这种方式一般容易被用户发现，浏览器会明确的提示证书错误，但某些用户安全意识不强，可能会点击继续浏览，从而达到攻击目的。")]),t._v(" "),s("p",[t._v("SSL剥离攻击是指攻击者劫持了客户端和服务器之间的连接，攻击者保持自己和服务器之间的HTTPS连接，但发送给客户端普通的HTTP连接，由于HTTP连接是明文传输的，即可获取客户端传输的所有明文数据。")]),t._v(" "),s("h2",{attrs:{id:"如何劫持-https-的请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何劫持-https-的请求"}},[t._v("#")]),t._v(" 如何劫持 https 的请求")]),t._v(" "),s("p",[t._v("HTTPS有防篡改的特点，只要浏览器证书验证过程是正确的，很难在用户不察觉的情况下进行攻击。但若能够更改浏览器的证书验证过程，便有机会实现HTTPS中间人攻击。")]),t._v(" "),s("p",[t._v("所以，要劫持HTTPS，首先要伪造一个证书，并且要想办法让用户信任这个证书，可以有多种方式，比如病毒、恶意软件、诱导等。一旦证书被信任后，就可以利用普通中间人攻击的方式，使用伪造的证书进行攻击。")]),t._v(" "),s("Vssue",{attrs:{options:{labels:[t.$page.relativePath.split("/")[0]]},title:t.$page.relativePath.split("/")[1]}})],1)}),[],!1,null,null,null);v.default=a.exports}}]);