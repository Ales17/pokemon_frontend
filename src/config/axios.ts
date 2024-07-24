import axios from "axios";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

instance.interceptors.request.use(
  (config) => {
    const authCookie = getCookie("session");
    if (authCookie) {    
      config.headers["Authorization"] = `Bearer ${authCookie}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
