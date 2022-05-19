# JWT

## 概述

回顾登录流程：

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220516104356436.png" alt="image-20220516104356436" style="zoom:80%;" />

接下来的问题是，这个出入证（令牌）里面存的是什么？

一种比较简单的办法就是直接存储用户信息的JSON串，但这会造成下面几个问题：

- 在非浏览器环境，如何在令牌中记录过期时间
- 如何防止令牌被伪造

JWT就是为了解决这些问题而出现的。

JWT全称`Json Web Token`，本质就是一个字符串，它能够提供**统一的、安全的**令牌格式。

在传输JWT时，我们可以使用任何方式来传输，一般来说，我们会使用响应头来传输它。

比如，当登录成功后，服务器可以给客户端响应一个JWT：

```http
HTTP/1.1 200 OK
...
set-cookie: token=jwt令牌
authentication: jwt令牌
...

{..., token: jwt令牌}
```

可以看到，jwt令牌可以出现在响应的任何一个地方，客户端和服务器自行约定即可。当客户端拿到令牌后，我们需要将它存储起来。当后续请求发生时，将它作为请求的一部分发送到服务器即可。

虽然jwt没有明确要求应该如何附带到请求中，但通常我们会使用如下的格式：

```http
GET /api/resources HTTP/1.1
...
authorization: bearer jwt令牌
...
```

这样一来，服务器就能够收到这个令牌了，通过对令牌的验证，即可知道该令牌是否有效。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220519172312512.png" alt="image-20220519172312512" style="zoom:80%;" />

## 令牌的组成

为了保证令牌的安全性，jwt令牌由三个部分组成，分别是：

- header：令牌头部，记录了整个令牌的类型和签名算法
- payload：令牌负荷，记录了保存的主体信息，比如你要保存的用户信息就可以放到这里
- signature：令牌签名，按照头部固定的签名算法对整个令牌进行签名，该签名的作用是：保证令牌不被伪造和篡改

它们组合而成的完整格式是：`header.payload.signature`

比如，一个完整的jwt令牌如下：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9.BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc
```

它各个部分的值分别是：

- header：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- payload：`eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9`
- signature：`BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc`

## 令牌的验证

