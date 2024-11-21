import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Automatically picks from the right .env file
});

// Attach JWT token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses globally
API.interceptors.response.use(
  (response) => response, // Pass through if successful
  (error) => {
    console.error("API Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export const login = (credentials) => API.post('/auth/login', credentials);

export const fetchDashboard = () => API.get('/dashboard');

export const fetchChartSummary = () => API.get('/chartData/summary');

export const fetchChartReports = () => API.get('/chartData/reports');

