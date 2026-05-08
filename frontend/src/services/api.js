import axios from 'axios'

// Locally: set VITE_API_URL in .env  (http://localhost:8000/api)
// On Azure: set VITE_API_URL in Static Web App environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
})

export const getAllStudents = (search = '') => {
  const params = search ? { search } : {}
  return api.get('/students/', { params })
}

export const getStudentById = (id) => api.get(`/students/${id}/`)

export const createStudent = (data) => api.post('/students/', data)

export const updateStudent = (id, data) => api.put(`/students/${id}/`, data)

export const deleteStudent = (id) => api.delete(`/students/${id}/`)

export const getStudentStats = () => api.get('/students/stats/')
