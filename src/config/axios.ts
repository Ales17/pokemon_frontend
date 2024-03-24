import axios from "axios";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("pika");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
