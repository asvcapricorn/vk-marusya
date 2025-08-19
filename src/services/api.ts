import axios from 'axios'

const api = axios.create({
  baseURL: 'https://cinemaguide.skillbox.cc',
  withCredentials: true,
})

export default api
