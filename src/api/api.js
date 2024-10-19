import { create } from 'apisauce'


export const api = create({
  baseURL: 'http://192.168.0.108:5095/api/',
  headers: { Accept: "application/json" },
})
api.addRequestTransform(request => {
  const token = localStorage.getItem('token', false);
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  } 
})