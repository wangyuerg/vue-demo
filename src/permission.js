import router from './router'
import store from './store'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// 免登陆路由name名单,登录路由,默认路由
import { allowList, loginRoutePath, defaultRoutePath } from '@/router/router.config'

router.beforeEach((to, from, next) => {
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
    } else {
      // 刷新时，角色信息为空
      if (store.getters.roles.length === 0) {
        // 请求用户信息
        store
          .dispatch('GetInfo')
          .then((res) => {
            const roles = res.data && res.data.role
            // 两种方式，接口动态路由,role权限生成路由(取决于store/index里引哪个文件)
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 动态添加可访问路由表
              store.getters.addRouters.forEach((r) => {
                router.addRoute(r)
              })
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch((e) => {
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
    }
  }
})

router.afterEach(() => {})
