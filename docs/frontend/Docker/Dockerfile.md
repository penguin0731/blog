# Dockerfile

当我们执行构建镜像的命令时，Dockerfile 将会被运行



- FROM
- WORKDIR：设置当前的工作目录，后续的命令将在这个目录中运行，如果该目录不存在，则会创建一个目录
  - 这个命令虽然设置了当前工作目录，但还是推荐使用绝对路径，因为这样更加清晰直观，而不用去阅读上下文去分析当前目录的路径
- RUN：在当前镜像中运行终端命令
- COPY 和 ADD
- EXPOSE
- ENTYRPOINT 和 CMD
- VOLUME









