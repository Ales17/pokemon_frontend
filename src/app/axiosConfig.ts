import axios from "axios";
import { getCookie } from "cookies-next";
const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});
const cookie = getCookie("pika");
if (cookie) {
  const token = "Bearer " + cookie;
  instance.defaults.headers.common["Authorization"] = token;
}
export default instance;
