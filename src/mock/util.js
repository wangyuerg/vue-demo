const responseBody = {
  msg: '',
  timestamp: 0,
  data: null,
  code: '000000',
}

export const builder = (data, message, code = '000000', headers = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.msg = message
  }
  if (code !== undefined && code.length !== 6) {
    // 模拟401\500等
    responseBody.code = code
    responseBody._status = code
  }
  if (code !== undefined && code.length === 6 && code !== '000000') {
    // 模拟后端200但有业务错误，非000000
    responseBody.code = code
    responseBody._status = 200
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}'
  )
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}
