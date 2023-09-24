import axios from "axios";
import { base_url } from "./api_urls";
import { setupInterceptorsTo } from "./interceptors";

const api = setupInterceptorsTo(
  axios.create({
    baseURL: base_url,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default api;
