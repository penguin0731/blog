# el-menu切换菜单时触发两次导航守卫

> 2023.08.30

## 问题描述

vue3 + elementplus 的项目中，在某个页面的编辑状态中离开时，需要提示用户数据未保存，此时需要借助导航守卫 onBeforeRouteLeave 进行拦截，但导航守卫却触发了两次。

因为代码量较大，这里只贴出简易版的关键代码：

```vue
<!-- Sidebar.vue -->
<template>
	<el-menu :default-active="activeMenu" router>
		<sidebar-item :item="homeItem" />
		<sidebar-item
			v-for="(route, index) in sidebarRouters"
			:key="route.path + index"
			:item="route"
		/>
	</el-menu>
</template>
```

```vue
<!-- SidebarItem.vue -->
<template>
	<router-link :to="resolvePath(item.path)">
		<el-menu-item :index="resolvePath(item.path)">
			<template #title>
				<span class="menu-title">{{ item.meta.title }}</span>
			</template>
		</el-menu-item>
	</router-link>
</template>
```

## 解决过程与方案

关键代码在 Sidebar 组件中 el-menu 组件的 router 属性，这里贴一下官方的属性说明。

![image-20230830101123728](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202308301011878.png)

当 el-menu 组件开启 router 属性时，会以 index 的属性值作为 path 进行**路由跳转**。而我们在 SidebarItem 组件中，已经使用了 router-link 进行了路由跳转，这就相当于进行了两次路由跳转，因此也会触发两次导航守卫。

所以只需要将 router 属性设置 false，或者去掉 router-link 即可解决问题。

不过这里有一些细节是，如果希望路由地址与 el-menu 当前激活菜单的 index 匹配的话，应该开启 router 属性，否则可能会出现导航守卫已经拦截了跳转，但 el-menu 还是激活了目标菜单，使得当前路由与 el-menu 当前激活菜单不匹配的情况。