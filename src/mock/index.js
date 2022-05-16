import { isIE } from '@/utils/util'

// mock模式，加载 mock 服务
if (process.env.VUE_APP_NAME === 'mock') {
  if (isIE()) {
    console.error('ERROR: `mockjs` NOT SUPPORT `IE`')
  }
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log('mock mounting')
  const Mock = require('mockjs2')
  require('./services/auth')
  require('./services/user')

  Mock.setup({
    timeout: 0, // setter delay time
  })
  console.log('mock mounted')
}
