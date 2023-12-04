# 域名和DNS

## 域名

域名👉 `www.baidu.com`

域名的作用是帮助我们记忆网站地址，有了域名，就不用去记IP地址了。

域名的类型有以下几种：

- 根域名：`.`
- 顶级域名：`.cn .com .net .us .uk .org ... `
- 二级域名：`.com .gov .org .edu 自定义 baidu jd taobao ...`
- 三级域名：`自定义 www.baidu.com www.jd.com www.taobao.com`
- 四级域名：`自定义 www.pku.edu.cn  mail.internal.jd.com`

一般来说，购买二级域名后，三级、四级域名都是可以免费自定义的。

## DNS

DNS的作用就将域名解析成IP地址。

域名解析过程如下：

1. 查找本机hosts文件中是否有解析记录，如果有，直接使用
2. 查找本地域名服务器中是否有解析记录，如果有，直接使用
3. 查询根域名服务器，得到顶级域名服务器ip
4. 查询顶级域名服务器中是否有解析记录，如果有，直接使用
5. 根据顶级域名服务器反馈的ip，查询权限域名服务器，如果有解析记录，直接使用
6. 如果以上都找不到，域名解析失败

为了使得解析速度更快、查询的节点更少，上述每个节点都可能设置高速缓存来加速解析。

### DNS解析的优化

通过使用 dns-prefetch 在请求资源之前先解析资源的域名。

当我们在地址栏输入 url 的时候，浏览器会将域名经过 DNS 解析得到 ip 地址，这个解析过程是耗时的，但也是有缓存的，在第二次访问时，DNS 会直接从缓存中查找。

但如果浏览器在解析 dom 树的过程中，遇到一些跨域的资源，会阻塞解析，去请求跨域的资源，这个时候又要再次进行 DNS 解析，当不同的跨域资源越多时，首页白屏时间就越长，这种时候就需要将这些跨源的域名提前进行 DNS 解析。

dns-prefetch 可以帮助我们解决这个问题，在 link 标签中将 rel 属性设置为 dns-prefetch，href 设置为跨源的域名。

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
```

#### 最佳实践

将 dns-prefetch 与 preconnect 提示配对。dns-prefetch 只执行 DNS 查询，而 preconnect 则是建立与服务器的连接。这个过程包括 DNS 解析，以及建立 TCP 连接，如果是 HTTPS 网站，就进一步执行 [TLS](https://developer.mozilla.org/zh-CN/docs/Glossary/TLS) 握手。将这两者结合起来，可以进一步减少[跨源请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)的感知延迟。你可以像这样安全地将它们结合起来使用：

```html
<link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin />
<link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
```



## 参考链接

- [使用 dns-prefetch - Web 性能 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/Performance/dns-prefetch)





<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>