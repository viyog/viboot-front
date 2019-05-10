import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:18080/api"
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
