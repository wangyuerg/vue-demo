import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// 角色权限控制动态路由，二选一
import permission from './modules/user-router'

// 接口控制动态路由
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
  },
  state: {},
  mutations: {},
  actions: {},
  getters,
})
