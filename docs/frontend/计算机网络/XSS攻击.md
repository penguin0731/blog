# XSS攻击

## 介绍

XSS（Cross Site Scripting，跨站脚本攻击），是指攻击者利用站点的漏洞，在表单提交时，在表单内容中加入一些恶意脚本，当其他正常用户浏览页面，而页面中刚好出现攻击者的恶意脚本时，脚本被执行，从而使得页面遭到破坏，或者用户信息被窃取。

![image-20220524153907583](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/image-20220524153907583.png)

## 防御方式

服务器端对用户提交的内容进行过滤或编码

- 过滤：去掉一些危险的标签，去掉一些危险的属性
- 编码：对危险的标签进行HTML实体编码

<Vssue 
    :options="{ labels: [$page.relativePath.split('/')[0]] }" 
    :title="$page.relativePath.split('/')[1]" 
/>