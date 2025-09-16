import axios from 'axios';

// Set default configurations for axios
axios.defaults.withCredentials = true;

// If you need to set a base URL
const API_URL =
    import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_URL;
//|| 'https://shehryarkhanfoundation.com/api'
// Add a request interceptor to set the Authorization header if token exists
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;