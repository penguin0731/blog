# Vetur1149错误

> 2021.11.26

## 问题描述

修改 home.vue 为 Home.vue，其中 router.js 文件引入了该组件，最终出现该错误且无法消除，这应该是 VSCode 的某个缓存导致的，所以最主要目的就是清除缓存，或者不使用该缓存。

## 解决过程与方案

- **个人认为的最优解：**
  1. 将 Home.vue 修改为 AnohterName.vue，保存全部文件
  2. `shift + ctrl + P` / `shift + command + P` 打开 VSCode 命令窗口，输入 reload window 重启窗口
  3. 将 AnohterName.vue 修改回 Home.vue，保存全部文件
  4. 重复第二步即可解决

- 使用 git 命令：
  - `git config --get core.ignorecase` 查看是否为忽视大小写，默认为 true
  - `git config core.ignorecase false` 设置不忽视大小写
  - `git rm --cached xxx -r` 删除未被追踪的文件，xxx 表示文件的绝对路径
  
- 删除引入文件的后缀名

```js
//修改前
import Home from './page/Home/Home.vue'; 
//修改后
import Home from './page/Home/Home';
```

- 直接删除本地项目，重新 clone

## 参考链接

- [https://github.com/microsoft/TypeScript/issues/25460](https://github.com/microsoft/TypeScript/issues/25460#issuecomment-531068391)

