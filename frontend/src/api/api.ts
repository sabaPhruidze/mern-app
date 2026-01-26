import axios from "axios";
import { getTokenFromStorage } from "../utils/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getTokenFromStorage();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
