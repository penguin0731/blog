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

![image-20220606164755838](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220606164755838.png)

但长轮询仍然存在问题：

- 客户端长时间收不到响应会导致超时，从而主动断开和服务器的连接
  - 这种情况是可以处理的，但ajax请求因为超时而结束时，立即重新发送请求到服务器，虽然这种做法会让之前的请求变得无意义，但毕竟比短轮询好多了
- 由于客户端可能「过早的」请求了服务器，服务器不得不挂起这个请求直到新消息的出现。这会让服务器长时间的占用资源却没什么实际的事情可做

## WebSocket

伴随着HTML5出现的WebSocket，从**协议**上赋予了服务器主动推送消息的能力。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220606165005672.png" alt="image-20220606165005672" style="zoom:67%;" />

