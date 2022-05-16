// eslint-disable-next-line
/**
 * 路由配置项，包括基础路由和角色控制路由
 */
import { UserLayout, BasicLayout } from '@/layouts'
import { lgAnalyse } from '@/assets/icons' // 自定义icon

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
}
/**
 * 免登录路由名单
 */
export const allowList = ['login']

/**
 * 登录路由
 */
export const loginRoutePath = '/user/login'

/**
 * 默认路由
 */
export const defaultRoutePath = '/dashboard/workplace'

/**
 * 角色权限控制的路由
 * meta信息中，hiddenHeaderContent表示隐藏头部（title+面包屑），hiddenBread表示显示头部但隐藏面包屑，两个字段默认为false
 * meta信息中，icon可使用自定义图标（从@/asstes/icons/icons中引入）。或使用antd自带图标，自带图标icon字段填写string类型。可选项https://www.antdv.com/components/icon/#Custom-Font-Icon
 * 本版本二级菜单不支持icon
 */
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
          title: '地图',
          keepAlive: true,
          // 自定义图标
          icon: lgAnalyse,
          permission: ['dashboard'],
        },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '杭州地图', keepAlive: true, permission: ['dashboard'] },
          },
        ],
      },
      // 布局例子
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        // hidden: true, // 不显示在侧导航栏
        // antd自带图标
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

/**
 * 基础路由,所有用户都有
 * @type { *[] }
 */
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
