# Docker Compose

Docker Compose 是 Docker 官方提供的开源工具，用于快速编排容器和管理。



使用 Docker Compose 本质上就是三个步骤：

1. 配置 Dockerfile 来定义你的项目环境
2. 配置 compose.yml 来定义你的应用服务，让它们能够在一个隔离环境中一起运行
3. 执行 docker-compose up 命令来启动整个应用程序



## yml 配置文件







## Docker Compose 和 Kubernetes 区别

Docker Compose 和 Kubernetes 是两个主要用于容器编排和管理的工具，它们在功能和使用方式上有一些区别：

- 目标和规模
  - Docker Compose 主要用于本地开发、测试环境和部署简单的多容器应用，更适合小型项目和个人开发者
  - Kubernetes 适用于大规模的生产环境和复杂的应用程序
- 多主机支持
  - Docker Compose 主要用于单主机或者通过 Docker Machine 来管理多个主机
  - Kubernetes 是可以管理多个主机和多个集群，支持容器的多节点部署
- 自动化
  - Docker Compose 需要手动执行命令来创建、启动、停止容器，不提供自动伸缩和自动故障恢复
  - Kubernetes 可以配置自动伸缩策略，根据负载自动扩展或缩减应用程序的副本，并具备自动故障恢复能力

