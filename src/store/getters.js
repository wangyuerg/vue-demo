const getters = {
  isMobile: (state) => state.app.isMobile,
  theme: (state) => state.app.theme,
  color: (state) => state.app.color,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  nickname: (state) => state.user.name,
  roles: (state) => state.user.roles,
  userInfo: (state) => state.user.info,
  addRouters: (state) => state.permission.addRouters,
  multiTab: (state) => state.app.multiTab,
}

export default getters
