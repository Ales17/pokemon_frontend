import axios from "axios";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

instance.interceptors.request.use(
  (config) => {
    const sessionCookie = getCookie("session");
    if (sessionCookie) {    
      config.headers["Authorization"] = `Bearer ${sessionCookie}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
