import axios from "axios";
import { getTokenFromStorage } from "../utils/storage";

const api = axios.create({
    baseURL:'http://localhost:3000/',
    timeout:10000,
})
api.interceptors.request.use((config) => {
    const token = getTokenFromStorage();
    if(token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
export default api;