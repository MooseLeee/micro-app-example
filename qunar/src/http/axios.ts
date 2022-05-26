import axios from 'axios'

const http = axios.create({
    baseURL: '',
    timeout: 20000,
})

http.interceptors.request.use(
    (config) => {
        return config
    },
    err => Promise.reject(err)
)

http.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (!error.response) return Promise.reject(error)
        const { status } = error.response
        switch (status) {
            case 401:case 412:
                // 401或412说明token未传或失效，一般做重新登录操作
                break
            case 404:
                // 请求资源不存在
                break
            case 500:
                // 后台服务器内部错误，一般向用户展示服务器错误信息
                break
            default: return Promise.reject(error);
        }
    }
)

export default http