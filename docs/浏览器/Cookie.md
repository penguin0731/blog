# Cookie

## 场景问题

假设服务器有一个接口，通过请求这个接口，可以添加一个管理员。

那么，服务器如何知道请求接口的人是否有这个权限呢？

答案是：只有登录过的管理员才有这个权限。

可问题是，客户端和服务器的传输使用的是http协议，而http协议是无状态的。什么是无状态？就是**服务器不知道这一次请求的人，跟上一次登录请求成功的人是不是同一个人。**

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220516100310546.png" alt="image-20220516100310546" style="zoom: 80%;" />

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220516100635909.png" alt="image-20220516100635909" style="zoom:80%;" />

于是，服务器想了一个办法

它按照下面的流程来认证客户端的身份：

1. 客户端登录成功后，服务器会给客户端一个出入证
2. 后续客户端的每次请求，都必须要附带这个出入证

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220516104356436.png" alt="image-20220516104356436" style="zoom:80%;" />

但是，用户不可能只在一个网站登录，于是客户端会收到来自各个网站的出入证，因此，就要求客户端要有一个类似于卡包的东西，能够具备下面的功能：

1. **能够存放多个出入证**。这些出入证来自不同的网站，也可能是一个网站有多个出入证，分别用于出入不同的地方
2. **能够自动出示出入证**。客户端在访问不同的网站时，能够自动的把对应的出入证附带请求发送出去。
3. **正确的出示出入证**。客户端不能将肯德基的出入证发送给麦当劳
4. **管理出入证的有效期**。客户端要能够自动的发现那些已经过期的出入证，并把它从卡包内移除

能够满足上面所有要求的，就是Cookie。

Cookie类似于一个卡包，专门用于存放各种出入证，并有着一套机制来自动管理这些证件。

卡包内的每一张卡片，称之为**一个Cookie**。

## Cookie的组成

Cookie是浏览器中特有的一个概念，它就像浏览器的专属卡包，管理着各个网站的身份信息。

每个Cookie就相当于是属于某个网站的一个卡片，它记录了下面的信息：

- name：记录信息的名字
- value：记录信息的数据
- domain：记录这个Cookie所属的域名
- path：记录这个Cookie所属域名的路径
- secure：是否使用安全传输，即https
- expire：记录这个Cookie过期的时间，必须是一个GMT时间
- max-age：记录这个Cookie过期的相对时间，expire和max-age通常仅设置一个即可。比如设置max-age为1000，浏览器在添加Cookie时，会自动设置它的expire为当前时间加上1000秒，作为过期时间。
  - 如果不设置expire，又没有设置max-age，则表示会话结束后过期。
  - 对于大部分浏览器而言，关闭所有浏览器窗口意味着会话结束。
- httpOnly：是否禁止JavaScript访问，即不能通过document.cookie访问

当浏览器向服务器发送一个请求的时候，它会瞄一眼自己的卡包，看看哪些卡片适合，附带捎给服务器。

如果一个Cookie**同时满足**以下条件，则这个Cookie会被浏览器自动附带到请求中：

- Cookie没有过期
- Cookie中的域和这次请求的域匹配
  - 比如Cookie中的域是`baidu.com`，则可以匹配`baidu.com`、`www.baidu.com`、`fanyi.baidu.com`等等
  - 比如Cookie中的域是`www.baidu.com`，则只能匹配`www.baidu.com`
  - Cookie是不在乎端口的，只要域匹配即可
- Cookie中的path和这次请求的path匹配
  - 比如cookie中的path是`/news`，则可以匹配的请求路径可以是`/news`、`/news/detail`、`/news/a/b/c`等等，但不能匹配`/blogs`
  - 如果cookie的path是`/`，可以想象，能够匹配所有的路径
- 验证cookie的安全传输
  - 如果cookie的secure属性是true，则请求协议必须是`https`，否则不会发送该cookie
  - 如果cookie的secure属性是false，则请求协议可以是`http`，也可以是`https`

## 如何设置Cookie

由于Cookie是保存在浏览器端，又是由服务器颁发的，所以Cookie的设置有两种方式：

- 服务器响应：这种方式是非常普遍的，当服务器决定给客户端颁发一个证件时，它会在响应的消息中包含Cookie，浏览器会自动的把Cookie保存到卡包中
- 客户端设置：这种方式少见一些，不过也有可能会发生，比如用户关闭了某个广告，并选择了「以后不要再弹出」，此时就可以把这种小信息直接通过浏览器的JS代码保存到Cookie中。后续请求服务器时，服务器会看到客户端不想要再次弹出广告的Cookie，于是就不会再发送广告过来了。

```js
document.cookie = "键=值; path=?; domain=?; expire=?; max-age=?; secure";
```

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>

