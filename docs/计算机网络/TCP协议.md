# TCP协议

## TCP收发数据流程

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220523164451265.png" alt="image-20220523164451265" style="zoom: 50%;" />

## 建立连接（三次握手）

TCP协议要实现数据的收发，必须要先建立连接。

连接的本质其实就是双方各自开辟的一块儿内存空间，空间中主要是数据缓冲区和一些变量。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220523164813965.png" alt="image-20220523164813965" style="zoom: 67%;" />

**连接建立的过程需要经过三次数据报传输，因此称之为三次握手**

> 开始
>
> 客户端：我说话能听见吗？
>
> 服务器：能听见，我说话能听见吗？
>
> 客户端：能听见
>
> 结束

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220523172208548.png" alt="image-20220523172208548" style="zoom:50%;" />

TCP 协议通过三次握手建立可靠的点对点连接，具体过程是：

首先服务器进入监听状态，然后即可处理连接。

第一次握手：建立连接时，客户端发送 SYN 包到服务器，并进入 SYN_SENT 状态，等待服务器确认。在发送的包中还会包含一个初始序列号 seq。此次握手的含义是客户端希望与服务器建立连接。

第二次握手：服务器收到 SYN 包，然后回应给客户端一个 SYN+ACK 包，此时服务器进入 SYN_RCVD 状态。此次握手的含义是服务端回应客户端，表示已收到并同意客户端的连接请求。

第三次握手：客户端收到服务器的 SYN 包后，向服务器再次发送 ACK 包，并进入 ESTAB_LISHED 状态。

最后，服务端收到客户端的 ACK 包，于是也进入 ESTAB_LISHED 状态，至此，连接建立完成。

## TCP如何收发数据

### 分段发送

将完整的数据按字节编号，每次只取一部分数据进行发送，每次发送时，会在取出的数据添加一个头部。

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220523165514614.png" alt="image-20220523165514614" style="zoom: 50%;" />

### 可靠传输

在TCP协议中，任何时候、任何一方都可以主动发送数据给另一方。

为了解决数据报丢失、数据报错乱等问题，TCP协议要求：**接收方收到数据报后，必须对数据报进行确认！**

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220523171141705.png" alt="image-20220523171141705" style="zoom: 50%;" />

- seq：表示这次数据报的序号
- ACK：表示这次数据报是一个确认数据报
- ack：表示期望下一次接收的数据报序号

发送方如果长时间没有收到确认数据报（ACK=1），则会判定丢失或者是错误，然后重发。

## 销毁连接（四次挥手）

