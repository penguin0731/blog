> 2021.06.25

## 问题描述

在一个企业微信 H5 项目中，有一个长按识别二维码和小程序码的需求，而这个功能实际上在企业微信里就自带的，前端只需要使用 img 元素将小程序码和二维码展示出来即可，但客户反馈在 ios 系统的企业微信中无法长按识别。ios 系统中微信则正常识别。

## 解决过程与方案

- 尝试过将 img 替换成 background-image，经过测试不仅没法解决，连安卓都失去了长按识别的功能，可见企业微信是基于 img 元素实现的长按识别
- 上网查找解决方案均无效，后来想起企业微信跟微信一样，内置浏览器使用是 ios 自己的内核，而 ios 在长按目标时，会显示有关链接的标注信息，正好有一个 css 属性是能够控制这一行为的，就是 -webkit-touch-callout，只需要将它设置为 none 就可以了

## 参考链接

- [-webkit-touch-callout - CSS: Cascading Style Sheets | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-touch-callout)


