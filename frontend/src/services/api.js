import axios from 'axios';

// Base API instance
const api = axios.create({
    baseURL: 'http://localhost:3000', // Adjust if backend runs on a different port
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('JWT_TOKEN'); // Retrieve token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

