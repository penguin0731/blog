## 问题描述

在ios中这样的日期格式得到的是`Invalid Date`，而在安卓中正常获取

```js
new Date('2021-06-30 00:00:00')
```

## 解决过程与方案

ios不支持`YYYY-MM-DD`，需要改成`YYYY/MM/DD`

```js
new Date('2021/06/30 00:00:00')
```

