import axios from "axios";

const api = axios.create({
  baseURL: `https://k7a101.p.ssafy.io/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      config.headers["access-token"] = token;
      return config;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
