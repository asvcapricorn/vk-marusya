import axios from 'axios'
import { emitter } from '@/utils/index'

const api = axios.create({
  baseURL: 'https://cinemaguide.skillbox.cc',
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      emitter.emit('auth:required')
    }
    return Promise.reject(error)
  },
)

export default api
