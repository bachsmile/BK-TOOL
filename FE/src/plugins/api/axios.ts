import axios from "axios";

const axiosIns = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});
// Request interceptor
axiosIns.interceptors.request.use(
  (config: any) => {
    // Thêm token vào header
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosIns.interceptors.response.use(
  (response: any) => response,
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosIns;
