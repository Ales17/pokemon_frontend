import axios from "axios";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

instance.interceptors.request.use(
  (config) => {
    let apiToken = null;
    const authCookie = getCookie("session");
    if (authCookie) {
      const parsedCookie = JSON.parse(authCookie);
      apiToken = parsedCookie.t;
    }

    //if (token) {
    if (apiToken) {
      config.headers["Authorization"] = `Bearer ${apiToken}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
