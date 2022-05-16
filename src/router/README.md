# 路由/菜单说明

> 本框架提供两种路由模式
> 方式一：前端设置基础路由+动态路由，由用户接口信息获得 permissionList 决定其可访问的动态路由
> 方式二：携带 token 从后端接口获得动态生成路由
> 切换方式：在 store/index.js 中引入 user-router 或 async-router

[toc]

## 格式和说明

```ecmascript 6
const routerObject = {
  redirect: noredirect,
  name: 'router-name',
  hidden: true,
  meta: {
    title: 'title',
    icon: 'a-icon',
    target: '_blank|_self|_top|_parent',
    keepAlive: true,
    hiddenHeaderContent: true,
  }
}
```

`{ Route }` 对象

| 参数               | 说明                                                 | 类型    | 默认值 |
| ------------------ | ---------------------------------------------------- | ------- | ------ |
| hidden             | 控制路由是否显示在 sidebar                           | boolean | false  |
| redirect           | 重定向地址, 访问这个路由时,自定进行重定向            | string  | -      |
| name               | 路由名称, 必须设置,且不能重名                        | string  | -      |
| meta               | 路由元信息（路由附带扩展信息）                       | object  | {}     |
| hideChildrenInMenu | 强制菜单显示为 Item 而不是 SubItem(配合 meta.hidden) | boolean | -      |

`{ Meta }` 路由元信息对象

| 参数                | 说明                                                                                                                          | 类型         | 默认值 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------ | ------ |
| title               | 路由标题, 用于显示面包屑, 页面标题 \*推荐设置                                                                                 | string       | -      |
| icon                | 路由在 menu 上显示的图标,写类型为 string 比如'warning'，则使用 antd 自带图标，写@/assets/icons/icons 引入的组件则为自定义图标 | [string,svg] | -      |
| keepAlive           | 缓存该路由                                                                                                                    | boolean      | false  |
| target              | 菜单链接跳转目标（参考 html a 标记）                                                                                          | string       | -      |
| hidden              | 配合`hideChildrenInMenu`使用，用于隐藏菜单时，提供递归到父菜单显示 选中菜单项*（可参考 个人页 配置方式）*                     | boolean      | false  |
| hiddenHeaderContent | 隐藏面包屑和页面标题栏                                                                                                        | boolean      | false  |
| hideBread           | 隐藏面包屑                                                                                                                    | boolean      | false  |
| permission          | 与项目提供的权限拦截匹配的权限，如果不匹配，则会被禁止访问该路由页面                                                          | array        | []     |

> 路由自定义 `Icon` 请引入自定义 `svg` Icon 文件，然后传递给路由的 `meta.icon` 参数即可

## 基础路由

在 src/router/router.config.js 中，可理解为无权限固定路由，方式一和方式二共用。

```ecmascript 6
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
]
```

## 方式一：角色动态路由

在 src/router/router.config.js 中设置

```ecmascript 6
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // 重定向到第一个子目录
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: '仪表盘',
          keepAlive: true,
          icon: bxAnaalyse,
          permission: ['dashboard'],
        },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            // permisson为权限判断标识
            meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] },
          },
        ],
      },
      // 布局demo例子
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        // hidden: true, // 不显示在侧导航栏
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            // 隐藏头部
            meta: { title: '403', permission: ['exception'], hiddenHeaderContent: true },
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            // 隐藏面包屑
            meta: { title: '404', permission: ['exception'], hiddenBread: true },
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            // 正常展示
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]
```

> 1. 请注意 `component: () => import('..') ` 方式引入路由的页面组件为 懒加载模式。
> 2. `permission` 字段是用于用户角色权限判断的标识，可以进行自定义修改

步骤如下:

1. (permission.js)判断是否有 AccessToken 如果没有则跳转到登录页面，若有 token 则发请求获取用户信息和拥有权限 store.dispatch('GetInfo')
2. 用户信息获取成功后, 调用 store.dispatch('GenerateRoutes') 根据获取到的用户信息构建出一个已经过滤好权限的路由结构(src/store/modules/user-router.js)
3. 将构建的路由结构信息利用 Vue-Router 提供的动态增加路由方法 router.addRoutes 加入到路由表中
4. 加入路由表后将页面跳转到用户原始要访问的页面,如果没有 redirect 则进入默认页面 (/dashboard/workplace)
   > 把 登录 和 获取用户信息 分成了两个接口，主要目的在于当用户刷新页面时，可以根据登录时获取到的身份令牌（cookie/token）等，去获取用户信息，从而避免刷新需要调用登录接口

## 方式二：后端接口动态生成路由

步骤如下：

1. (permission.js)判断是否有 AccessToken 如果没有则跳转到登录页面，若有 token 则发请求获取用户信息 store.dispatch('GetInfo')
2. (src/store/modules/async-router.js)用户信息获取成功后, 调用 store.dispatch('GenerateRoutes')发起后端路由接口，将获得的数据处理成路由结构(src/router/generator-routers.js)
3. 将构建的路由结构信息利用 Vue-Router 提供的动态增加路由方法 router.addRoutes 加入到路由表中
4. 加入路由表后将页面跳转到用户原始要访问的页面,如果没有 redirect 则进入默认页面 (/dashboard/workplace)

后端路由返回数据举例：

```
[
    {
      name: 'dashboard',
      parentId: 0,
      id: 1,
      meta: {
        icon: 'dashboard',
        title: '仪表盘',
        show: true,
      },
      component: 'RouteView',
      redirect: '/dashboard/workplace',
    },
    {
      name: 'workplace',
      parentId: 1,
      id: 7,
      meta: {
        title: '工作台',
        show: true,
      },
      component: 'Workplace',
    },
    // Exception
    {
      name: 'exception',
      parentId: 0,
      id: 10024,
      meta: {
        title: '异常页',
        icon: 'warning',
        show: true,
      },
      redirect: '/exception/403',
      component: 'RouteView',
    },
    {
      name: '403',
      parentId: 10024,
      id: 10025,
      meta: {
        title: '403',
        show: true,
      },
      component: 'Exception403',
    },
    {
      name: '404',
      parentId: 10024,
      id: 10026,
      meta: {
        title: '404',
        show: true,
      },
      component: 'Exception404',
    },
    {
      name: '500',
      parentId: 10024,
      id: 10027,
      meta: {
        title: '500',
        show: true,
      },
      component: 'Exception500',
    },
  ]
```

| 字段      | 说明                                                           | 类型    | 默认值 |
| --------- | -------------------------------------------------------------- | ------- | ------ |
| component | 组件名，可选项在 generator-routers 的 constantRouterComponents | boolean | false  |
| redirect  | 重定向地址, 访问这个路由时,自定进行重定向                      | string  | -      |
| name      | 路由名称, 必须设置,且不能重名                                  | string  | -      |
| meta      | 路由元信息（路由附带扩展信息,和方式一一样）                    | object  | {}     |
