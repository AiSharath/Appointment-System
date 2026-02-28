import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({ baseURL: BASE })

export const appointmentService = {
  getAll:  ()           => api.get('/appointments').then(r => r.data),
  getById: (id)         => api.get(`/appointments/${id}`).then(r => r.data),
  create:  (data)       => api.post('/appointments', data).then(r => r.data),
  update:  (id, data)   => api.put(`/appointments/${id}`, data).then(r => r.data),
  delete:  (id)         => api.delete(`/appointments/${id}`).then(r => r.data),
}