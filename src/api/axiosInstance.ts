import axios from 'axios'

import ENV from '@/lib/environment'

const api = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    'x-api-key': ENV.publicKeyDb as string
  }
})

api.defaults.headers.post['Content-Type'] = 'application/json'

api.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.params = { ...config.params, _t: Date.now() }
  }
  return config
})

export default api
