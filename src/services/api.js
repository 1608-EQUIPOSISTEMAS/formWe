// src/services/api.js (o donde creaste tu instancia)
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://38.242.140.200:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`

  
  // 👇 De aquí sale el user_registration_id
  const uid = 1//localStorage.getItem('user_id') // o 'user_registration_id' si así lo guardas
  if (!uid) return config

  
  const method = (config.method || 'get').toLowerCase()

  if (['post', 'put', 'patch'].includes(method)) {
    if (config.data instanceof FormData) {
      // multipart: lo agregamos como campo más
      if (!config.data.has('user_registration_id')) {
        config.data.append('user_registration_id', uid)
      }
    } else {
      // JSON “normal”: merge sin pisar si ya viene
      config.data = { user_registration_id: uid, ...(config.data || {}) }
    }
  } else {
    // GET/DELETE → va en query string
    config.params = { ...(config.params || {}), user_registration_id: uid }
  }

  // muestra overlay salvo que lo pidan explícitamente
  if (!config.meta?.skipLoader) loader.start()
  return config
}, (error) => {
  loader.stop()
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  if (!response.config.meta?.skipLoader) loader.stop()
  return response
}, (error) => {
  // intenta leer config del request que falló
  if (!error.config?.meta?.skipLoader) loader.stop()
  return Promise.reject(error)
})

export default api
