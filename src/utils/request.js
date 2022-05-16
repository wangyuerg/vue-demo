import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.msg ? data.msg : '',
      })
    } else if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      // 此处条件需要根据后端返回401携带的返回体设置
      notification.error({
        message: 'Unauthorized',
        description: '权限校验失败，请重新登录',
      })
      if (token) {
        // 删除token和role
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    } else {
      notification.error({
        message: '请求错误',
        description: data.msg ? data.msg : '',
      })
    }
  } else {
    notification.error({
      message: '请求错误',
    })
  }
  return Promise.reject(error)
}

request.interceptors.request.use((config) => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token token名称请根据实际情况自行修改
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, errorHandler)

// 200时的拦截
request.interceptors.response.use((response) => {
  const data = response.data
  console.log('31231321', data)
  if (typeof data.code === 'undefined' || (typeof data.code !== 'undefined' && data.code === '000000')) {
    // 不携带code信息，如文件下载 或 携带code且code为000000
    return response.data
  } else {
    notification.error({
      message: '请求错误',
      description: data.msg ? data.msg : '',
    })
  }
}, errorHandler)

// post请求
function post(url, data) {
  return request({
    method: 'post',
    url,
    data: data,
  })
}

// get请求
function get(url, params) {
  return request({
    method: 'get',
    url,
    params,
  })
}
// post文件导出
function postExport(url, data) {
  return request({
    method: 'post',
    url,
    responseType: 'blob',
    data: data,
  })
}
// get文件导出
function getExport(url, params) {
  return request({
    method: 'get',
    url,
    responseType: 'blob',
    params,
  })
}

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  },
}

export default request

export { installer as VueAxios, request as axios, get, post, postExport, getExport }
