# Java 的运行机制

在介绍 Java 的运行机制前，我们先来简单了解一下计算机组成原理。

计算机由软件和硬件设备组成，其中硬件分为外部设备和主机，外部设备即鼠标、键盘、音响等，主机则包含CPU（中央处理器）、主板、内存、硬盘、显卡、声卡等。

这里我们详细说一下内存和硬盘：

- 内存存储空间小，硬盘存储空间大
- 内存的数据存取速度快，硬盘的数据存取速度慢
- 内存属于临时性存储，如果计算机断电，内存中的信息就会丢失。硬盘属于永久性存储，不受断电影响



在了解完这些基本知识后，我们通过编写一段 Java 程序来了解 Java 的运行机制，内容如下：

- 在硬盘上创建一个源文件 Test.java
- 编写 Java 程序

```java
// Test.java
public class Test {
  public static void main(String[] args) {
    int x = 10;
    int[] array = new int[3]{1, 2, 3};
  }
} 
```

- 在终端运行 `javac Test.java` 命令进行代码编译
  - 此时 JVM 会开辟一块内存空间，用于将源文件 Test.java 编译成字节码文件 Test.class

- 在终端运行 `java Test.class` 命令执行 Java 程序
- 

- 







