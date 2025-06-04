import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success === false) {
      return Promise.reject(new Error(response.data.error?.message || 'Unknown API error'))
    }
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Перекинуть на логин
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
