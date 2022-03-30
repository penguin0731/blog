## 问题描述

修改home.vue为Home.vue，其中router.js文件引入了该组件，最终出现该错误且无法消除，这应该是VSCode的某个缓存导致的，所以最主要目的就是清除缓存，或者不使用该缓存

## 解决过程与方案

- **个人认为的最优解：**
  - 将Home.vue修改为AnohterName.vue，保存全部文件
  - shift+ctrl+p打开VSCode命令窗口，输入reload window重启窗口
  - 将AnohterName.vue修改回Home.vue，保存全部文件
  - 重复第二步即可解决

- 删除引入文件的后缀名

```js
//修改前
import Home from './page/Home/Home.vue'; 
//修改后
import Home from './page/Home/Home';
```

- 直接删除本地项目，重新clone

- 使用git命令：
  - git config --get core.ignorecase 查看是否为忽视大小写，默认为true
  - git config core.ignorecase false 设置不忽视大小写
  - git rm --cached xxx -r 删除未被追踪的文件，xxx表示文件的绝对路径。

- [参考资料](https://github.com/microsoft/TypeScript/issues/25460#issuecomment-531068391)

