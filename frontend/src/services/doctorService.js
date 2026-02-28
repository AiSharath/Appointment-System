import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({ baseURL: BASE })

export const doctorService = {
  getAll:  ()       => api.get('/doctors').then(r => r.data),
  getById: (id)     => api.get(`/doctors/${id}`).then(r => r.data),
  create:  (data)   => api.post('/doctors', data).then(r => r.data),
  delete:  (id)     =>api.delete(`/doctors/${id}`).then(r=>r.data)
}