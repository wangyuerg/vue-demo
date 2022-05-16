import { get, post } from '../utils/request'

const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  Register: '/auth/register',
  SendSms: '/account/sms',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav',
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
function login(parameter) {
  return post(userApi.Login, parameter)
}

function getSmsCaptcha(parameter) {
  return post(userApi.SendSms, parameter)
}

function getInfo() {
  return get(userApi.UserInfo)
}

function getCurrentUserNav() {
  return get(userApi.UserMenu)
}

function logout() {
  return post(userApi.Logout)
}

export default {
  login,
  getSmsCaptcha,
  getInfo,
  logout,
  getCurrentUserNav,
}
