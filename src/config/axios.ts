import axios from "axios";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

instance.interceptors.request.use(
  (config) => {
    let tkn = null;
    const authCookie = getCookie("auth");
    if (authCookie) {
      const jsonCookie = JSON.parse(authCookie);
      tkn = jsonCookie.t;
    }

    //if (token) {
    if (tkn) {
      config.headers["Authorization"] = `Bearer ${tkn}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
