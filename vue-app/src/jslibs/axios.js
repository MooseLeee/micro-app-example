/* eslint-disable */
/**
 * Created by Moose on 2021/8/23.
 */

import axios from 'axios'
import { apiDomain } from '@/configs/env';

const http = axios.create({
  baseUrl: apiDomain,
  timeout: 20000,
})

let getRes
http.interceptors.request.use(
  (config) => {
    getRes = false
    setTimeout(() => {
      if (!getRes) window.showLoading()
    }, 500)
    return config
  },
  error => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => {
    getRes = true
    window.hideLoading()
    if (response.data.code !== '000000') {
      window.showTips(response.data.mesg, 'error')
    }
    return response
  },
  (error) => {
    setTimeout(() => {
      if (!getRes) window.hideLoading()
    }, 500)
    if (!error.response) return Promise.reject(error)
    const { status, data } = error.response;
    switch (status) {
      case 401:
      case 412:
        // 401或412说明token未传或失效，一般做重新登录操作
        // window.location.href = '/login'
        break;
      case 404:
        window.showTips('请求资源不存在！', 'error')
        break
      case 500:
        // 后台服务器内部错误，一般向用户展示服务器错误信息
        // window.showTips(data.error.message, 'error')
        break
      default:
        // window.showTips(data.error.message, 'error')
        return Promise.reject(error);
    }
  }
)

export default http