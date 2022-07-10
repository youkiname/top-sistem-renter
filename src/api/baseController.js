import axios from "axios";
import { message } from 'antd';

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
    config.params['token'] = localStorage.getItem('token');
    return config;
}
axiosInstance.interceptors.request.use(onRequest, null);

axiosInstance.interceptors.response.use((response) => response, (error) => {
    message.error("Произошла ошибка при выполнении запроса.")
    throw error;
});

export class BaseController {
    instance = axiosInstance
}