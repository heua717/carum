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
    const requestUrl = config.url.split("/");
    const endPoint = requestUrl[requestUrl.length - 1];

    if (token) {
      if (endPoint !== "token" && jwt_decode(token).exp * 1000 < Date.now()) {
        const refreshToken = sessionStorage.getItem("refresh-token");
        const response = await axios.get(
          `https://k7a101.p.ssafy.io/api/user/token`,
          {
            headers: {
              "access-token": token,
              "refresh-token": refreshToken,
            },
          }
        );

        sessionStorage.setItem("access-token", response.data["accessToken"]);
        sessionStorage.setItem("refresh-token", response.data["refreshToken"]);
        token = response.data["accessToken"];
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
