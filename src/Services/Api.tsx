import axios from 'axios';

// Create the Axios instance
const api = axios.create({
  baseURL: 'https://localhost:44308/api/', 
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;