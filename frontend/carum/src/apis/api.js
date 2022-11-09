import axios from "axios";
import jwt_decode from "jwt-decode";

const api = axios.create({
  baseURL: `https://k7a101.p.ssafy.io/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async function (config) {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      if (jwt_decode(token).exp * 1000 < Date.now()) {
        const refreshToken = sessionStorage.getItem("refresh-token");
        const response = await api.post(
          `/user/token`,
          {},
          {
            headers: {
              "access-token": token,
              "refresh-token": refreshToken,
            },
          }
        );

        console.log(response);
        sessionStorage.setItem("access-token", response.data["access-token"]);
        sessionStorage.setItem("refresh-token", response.data["refresh-token"]);
      }

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
