import axios from "axios";

// Create axios instance with base url and credentials support
export const axiosInstance = axios.create({
    baseURL: "https://top-sistem.ru/api/",
    // baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true,
    credentials: true,
    headers: {
        common: {
            Accept: 'application/json',
        }
    }
});

// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
    config.params = config.params || {};
    config.params['token'] = localStorage.getItem('token-renter');
    return config;
}

axiosInstance.interceptors.request.use(onRequest, null);

export class BaseController {
    instance = axiosInstance
}