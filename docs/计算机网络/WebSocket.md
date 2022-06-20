# WebSocket

## 实时场景的旧处理方案

考虑网页中的以下场景：

- 股票K线图
- 聊天
- 警报、重要通知
- 余座
- 抢购页面的库存
- ......

上述场景有一个共同特点——实时性。

这种对实时性有要求的页面，会带来一些问题，比如下面的聊天场景：

![image-20220606164028082](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220606164028082.png)

由于HTTP协议是请求-响应模式，请求必须在前，响应必须在后，这就导致了服务器无法**「主动」**的把消息告诉客户端。

以前常见的解决方案有两种，短轮询和长轮询。

## 短轮询 short polling

短轮询是一种「话痨式」的方式，客户端每隔一小段时间就向服务器请求一次，询问有没有新消息。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220606164524774.png" alt="image-20220606164524774" style="zoom:67%;" />

实现短轮询是非常简单的，客户端只需要设置一个计时器不断发送请求即可。

但这种方案的缺陷是非常明显的：

- 会产生大量无意义的请求
- 会频繁打开关闭连接
- 实时性并不高

## 长轮询 long polling

长轮询解决了短轮询的问题，让每次请求都有意义。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220606164755838.png" alt="image-20220606164755838" style="zoom:67%;" />

但长轮询仍然存在问题：

- 客户端长时间收不到响应会导致超时，从而主动断开和服务器的连接
  - 这种情况是可以处理的，但ajax请求因为超时而结束时，立即重新发送请求到服务器，虽然这种做法会让之前的请求变得无意义，但毕竟比短轮询好多了
- 由于客户端可能「过早的」请求了服务器，服务器不得不挂起这个请求直到新消息的出现。这会让服务器长时间的占用资源却没什么实际的事情可做

## WebSocket

伴随着HTML5出现的WebSocket，从**协议**上赋予了服务器主动推送消息的能力。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220606165005672.png" alt="image-20220606165005672" style="zoom: 50%;" />

从上图可以看出：

- WebSocket也是建立在TCP协议之上的，利用的是TCP全双工通信的能力
- 使用WebSocket，会经历两个阶段：握手阶段、通信阶段

虽然优于轮询方案，但WebSocket仍然是有缺点的：

- 兼容性
- WebSocket是HTML5新增的内容，因此古董版本的浏览器并不支持
- 维持TCP连接需要耗费资源
  - 对于那些消息量少的场景，维持TCP连接确实会造成资源的浪费

> 为了充分利用TCP连接的资源，在使用了WebSocket的页面，可以放弃ajax，都用WebSocket进行通信，当然这会带来程序设计上的一些问题，需要权衡。

### 握手

WebSocket协议是一个高扩展性的协议，详细内容会比较复杂，这里仅讲解面试中会问到的握手协议。

当客户端需要和服务器使用WebSocket进行通信时，首先会使用**HTTP协议**完成一次特殊的请求-响应，这一次请求-响应就是**WebSocket握手**。

在握手阶段，首先由客户端向服务器发送一个请求，请求地址格式如下：

```shell
# 使用HTTP
ws://mysite.com/path
# 使用HTTPS
wss://mysite.com/path
```

请求头如下：

```css
Connection: Upgrade /* 嘿，后续咱们别用HTTP了，升级吧 */
Upgrade: websocket /* 我们把后续的协议升级为websocket */
Sec-WebSocket-Version: 13 /* websocket协议版本就用13好吗？ */
Sec-WebSocket-Key: YWJzZmFkZmFzZmRhYw== /* 暗号：天王盖地虎 */
```

服务器如果同意，就应该响应下面的消息：

```css
HTTP/1.1 101 Switching Protocols /* 换，马上换协议 */
Connection: Upgrade /* 协议升级了 */
Upgrade: websocket /* 升级到websocket */
Sec-WebSocket-Accept: ZzIzMzQ1Z2V3NDUyMzIzNGVy /* 暗号：小鸡炖蘑菇 */
```

**握手完成，后续消息收发不再使用HTTP，任何一方都可以主动发消息给对方**

## 总结

WebSocket是HTML5新增的协议，它利用HTTP协议完成握手，然后通过TCP连接通道发送消息，使用WebSocket协议能够实现服务器主动发送消息。

客户端和服务端要使用WebSocket进行通信时，首先需要客户端向服务器发送一个HTTP请求以进行WebSocket握手，请求行中的 path 需要使用`ws:`开头的地址，请求头中要分别加入`upgrade`、`connection`、`Sec-WebSocket-Key`、`Sec-WebSocket-Version`标记。

然后，服务器收到请求后，发现这是一个WebSocket协议的握手请求，于是在响应行中添加`Switching Protocols`，同时在响应头中添加`upgrade`、`connection`、`Sec-WebSocket-Accept`标记。

最后，当客户端收到响应后即可完成握手，随后使用建立的TCP连接直接发送和接收消息。

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>
