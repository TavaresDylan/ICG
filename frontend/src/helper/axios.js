import axios from "axios";
import store from "@/store";
import router from "@/router";

export default function axiosSetUp() {
  // Define API base URL
  axios.defaults.baseURL = "http://127.0.0.1:8085";

  // Each request use this pre-config
  axios.interceptors.request.use(
    function (config) {
      const token = store.getters["auth/token"];
      if (token) {
        config.headers.Authorization = `JWT ${token}`;
      }
      return config;
    },
    function (err) {
      return Promise.reject(JSON.stringify(err));
    }
  );

  // Checks each response on API call and check if refreshToken is needed
  axios.interceptors.response.use(
    function (res) {
      return res;
    },
    async function (err) {
      const originalRequest = err.config;
      if (
        err.response.status === 401 &&
        originalRequest.url.includes("/api/v1/jwt/refresh")
      ) {
        store.commit("auth/clearUserData");
        router.push("/login");
        return Promise.reject(JSON.stringify(err));
      } else if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await store.dispatch("auth/refreshToken");
        return axios(originalRequest);
      }
      return Promise.reject(JSON.stringify(err));
    }
  );
}
