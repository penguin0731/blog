# Dockerfile

当我们执行构建镜像的命令时，Dockerfile 将会被运行

## 指令

- FROM
- WORKDIR
  - 设置当前的工作目录，后续的命令将在这个目录中运行，如果该目录不存在，则会创建一个目录
  - 这个命令虽然设置了当前工作目录，但还是推荐使用绝对路径，因为这样更加清晰直观，而不用去阅读上下文去分析当前目录的路径
- RUN
  - 在当前镜像中运行终端命令
- COPY 和 ADD
- EXPOSE
  - 在容器中暴露一个端口号
  - 后续我们运行容器时，可以指定宿主机的一个端口号来映射容器的端口号，这样就能在宿主机进行访问
- ENTYRPOINT 和 CMD
  - ENTYRPOINT 和 CMD 都是运行命令，它们并不会在构建镜像的时候执行，而是当基于该镜像的容器启动时，才会执行
  - 
- VOLUME









