/**
 * 向后端请求用户的菜单，动态生成路由,和user-router二选一
 */
import { constantRouterMap } from '@/router/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'

const permission = {
  state: {
    routers: constantRouterMap, // 总路由，初始值：基础静态路由
    addRouters: [], // 新增动态路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { token } = data
        // 动态接口路由
        generatorDynamicRouter(token).then((routers) => {
          commit('SET_ROUTERS', routers)
          resolve()
        })
      })
    },
  },
}

export default permission
