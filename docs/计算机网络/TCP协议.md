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

首先服务器进入监听状态，然后即可处理客户端发起的连接。

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

> 开始
>
> 客户端：我说完了，挂了？
>
> 服务器：我明白你说完了，但别忙挂，我还有话要说。
>
> 服务器继续说......
>
> 服务器：我也说完了，挂了？
>
> 客户端：好的！
>
> 结束

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220523180640850.png" alt="image-20220523180640850" style="zoom: 67%;" />



任意一方都可以主动销毁连接，当需要销毁连接时，需要进行四次挥手才能销毁：

1. 客户端向服务端发送 FIN 包，表示客户端主动要关闭连接，然后进入 FIN_WAIT_1 状态，等待服务端返回 ACK 包。此后客户端不能再向服务端发送数据，但能读取数据。
2. 服务端收到 FIN 包后向客户端发送 ACK 包，然后进入 CLOSE_WAIT 状态，此后服务端不能再读取数据，但可以继续向客户端发送数据。
3. 客户端收到服务端返回的 ACK 包后进入 FIN_WAIT_2 状态，等待服务端发送 FIN 包。
4. 服务端完成数据的发送后，将 FIN 包发送给客户端，然后进入 LAST_ACK 状态，等待客户端返回 ACK 包，此后服务端既不能读取数据，也不能发送数据。
5. 客户端收到 FIN 包后向服务端发送 ACK 包，然后进入 TIME_WAIT 状态，接着等待足够长的时间（2MSL，相当于数据在客户端服务器端来回的时间）以确保服务端接收到 ACK 包，最后回到 CLOSED 状态，释放网络资源。如果没有等足够长的时间就关闭，服务器有可能没接收到，导致服务器一直发送 FIN 包而无法进入 CLOSED 状态并释放网络资源。
6. 服务端收到客户端返回的 ACK 包后便回到 CLOSED 状态，释放网络资源。

## HTTP和TCP的关系

<img src="https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220523193742051.png" alt="image-20220523193742051" style="zoom:67%;" />

HTTP协议是对内容格式的规定，它**使用**了TCP协议完成消息的可靠传输

在具体使用TCP协议时：

1. 客户端发消息给服务器叫做请求，服务器发消息给客户端叫做响应
2. 使用HTTP协议的服务器不会主动发消息给客户端（尽管TCP可以），只对请求进行响应
3. 每一个HTTP请求-响应，都要先建立TCP连接（三次握手），然后完成请求-响应后，再销毁连接（四次挥手）。这就导致每次请求-响应都是相互独立的，无法保持状态。

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>