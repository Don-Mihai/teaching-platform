// api/axiosConfig.ts
import axios from 'axios';
import { store } from '../redux/store';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3003/',
});

axiosInstance.interceptors.request.use(config => {
    const token = store.getState().user.token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
