import axios from "axios";
import { deserialize } from "../contexts/AuthProvider";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${deserialize(token)}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
