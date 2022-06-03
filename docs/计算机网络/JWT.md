# JWT

## 概述

回顾一下[使用Cookie解决如何维持登录状态](../浏览器/Cookie.md)的场景：

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220516104356436.png" alt="image-20220516104356436" style="zoom:80%;" />

接下来的问题是，这个出入证（令牌）里面存的是什么？

一种比较简单的办法就是直接存储用户信息的JSON数据，但这会造成下面几个问题：

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

可以看到，JWT令牌可以出现在响应的任何一个地方，客户端和服务器自行约定即可。当客户端拿到令牌后，我们需要将它存储起来。当后续请求发生时，将它作为请求的一部分发送到服务器即可。

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

为了保证令牌的安全性，JWT令牌由三个部分组成，分别是：

- header：令牌头部，记录了整个令牌的类型和签名算法
- payload：令牌负荷，记录了保存的主体信息，比如你要保存的用户信息就可以放到这里
- signature：令牌签名，按照头部固定的签名算法对整个令牌进行签名，该签名的作用是：保证令牌不被伪造和篡改

它们组合而成的完整格式是：`header.payload.signature`

比如，一个完整的JWT令牌如下：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9.BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc
```

它各个部分的值分别是：

- header：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- payload：`eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9`
- signature：`BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc`

下面分别对每个部分进行说明：

### header

`header`是令牌头部，记录了整个令牌的类型和签名算法。

它的格式是一个JSON对象，如下：

```json
{
  "alg":"HS256",
  "typ":"JWT"
}
```

该对象记录了：

- alg：`signature`部分使用的签名算法，通常可以取两个值
  - HS256：一种对称加密算法，使用同一个秘钥对`signature`加密解密
  - RS256：一种非对称加密算法，使用私钥签名，公钥验证
- typ：整个令牌的类型，固定写JWT即可

具体的生成方式及其简单，就是把`header`部分使用`base64 url`编码即可

> `base64 url`不是一个加密算法，而是一种编码方式，它是在`base64`算法的基础上对`+`、`=`、`/`三个字符做出特殊处理的算法
>
> 而`base64`是使用64个可打印字符来表示一个二进制数据，具体的做法参考[百度百科](https://gitee.com/link?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2Fbase64%2F8545775%3Ffr%3Daladdin)

浏览器提供了`btoa`函数，可以完成这个操作：

```js
window.btoa(JSON.stringify({
  "alg":"HS256",
  "typ":"JWT"
}))
// 得到字符串：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

同样的，浏览器也提供了`atob`函数，可以对其进行解码：

```js
window.atob("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
// 得到字符串：{"alg":"HS256","typ":"JWT"}
```

> nodejs中没有提供这两个函数，可以安装第三方库`atob`和`bota`搞定
>
> 或者，手动搞定

### payload

`payload`是令牌的主体信息，同样是一个JSON对象，它可以包含以下内容：

```json
{
	"ss": "发布人",
	"iat": "发布时间",
	"exp": "到期时间",
	"sub": "主题",
 	"aud": "接收人",
 	"nbf": "在此之前不可用",
 	"jti": "JWT ID"
}
```

主体信息完全由我们自定义，上述内容并不强制写入，只是一个规范。`payload`作为一个JSON对象，可以随意添加数据。

比如下面这个JSON对象也属于一个有效的`payload`：

```json
{
	"foo": "bar", // 这是我们自定义的数据
	"iat": 1587548215 // 这是JWT规范中的信息
}
```

`payload`和`header`一样，需要通过`base64 url`编码得到：

```js
window.btoa(JSON.stringify({
  "foo": "bar",
  "iat": 1587548215
}))
// 得到字符串：eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9
```

### signature

`signature`是JWT的签名，它的存在能够保证JWT不会被伪造。

`signature`是使用头部指定的签名算法将令牌头部和主体的编码结果进行加密得来的。

比如：头部指定的加密方法是`HS256`，前面两部分的编码结果是`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9`

则第三部分就是用对称加密算法`HS256`对字符串`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9`进行加密，当然你得指定一个秘钥，比如`shhhhh`

```js
HS256(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9`, "shhhhh")
// 得到：BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc
```

最终，将三部分组合在一起，就得到了完整的jwt

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9.BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc
```

由于签名使用的秘钥保存在服务器，这样一来，客户端就无法伪造出签名，因为它拿不到秘钥。换句话说，之所以说无法伪造jwt，就是因为第三部分的存在。

而前面两部分并没有加密，只是一个编码结果而已，可以认为几乎是明文传输。但这不会造成这不会造成太大的问题，因为既然用户登陆成功了，它当然有权力查看自己的用户信息。甚至在某些网站，用户的基本信息可以被任何人查看。我们要保证的是，不要把敏感的信息存放到JWT中，比如密码。

JWT中的`signature`可以保证令牌不被伪造，那么如何保证令牌不会被篡改呢？

比如，某个用户登陆成功了，获得了JWT，但他人为的篡改了`payload`，比如把自己的账户余额修改为原来的两倍，然后重新编码得到`payload`发送到服务器，服务器如何得知这些信息被篡改过了呢？

这就需要令牌的验证。

## 令牌的验证

令牌的验证很简单，就是把客户端传输的JWT中的`header+payload`用同样的秘钥和加密算法重新加密，然后把加密结果，和客户端传输的JWT中的`signature`进行比较，如果完全相同，就证明没有被篡改过，否则反之。

```
传入的header.传入的payload.传入的signature
新的signature = header中的加密算法(传入的header.传入的payload, 秘钥)
验证：新的signature == 传入的signature
```

当验证了令牌没有被篡改后，就可以进行其他的验证，比如是否过期，接收人是否符合要求等等，这些就需要根据需求来定。

## 总结

JWT本质上是一种规范的令牌格式，主要分为三个部分，`header`、`payload`和`signature`。

其中`header`表示签名算法和令牌类型；`payload`表示主体信息，包含了令牌过期时间、发布时间、发布人等信息；`signature`则是使用指定的算法对前两个部分加密得到的结果。

JWT能够防止篡改，如果攻击者改动了前两个部分，就会导致第三个部分对应不上，使得token失效。而攻击者不知道秘钥，就无法改动第三个部分。

所以，在秘钥不被泄露的前提下，一个验证通过的 token 是值得被信任的。

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>
