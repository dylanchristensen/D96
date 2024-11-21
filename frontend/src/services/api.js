import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', 
});

// Attach JWT token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => API.post('/auth/login', credentials);

export const fetchDashboard = () => API.get('/dashboard');

export const fetchChartSummary = () => API.get('/chartData/summary');

export const fetchChartReports = () => API.get('/chartData/reports');
