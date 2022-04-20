import Vue from "vue";
import router from "@/router/index";
import { getField, updateField } from "vuex-map-fields";

export const authModule = {
  namespaced: true,
  state: () => ({
    token: "",
    isAuthenticated: false,
    credentials: {},
    errorLoginMsg: "",
    errorLoginStatus: false,
  }),
  getters: {
    getField,
  },
  mutations: {
    updateField,
    initializeStore(state) {
      if (localStorage.getItem("JWT")) {
        state.token = localStorage.getItem("JWT");
        state.isAuthenticated = true;
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
  actions: {
    refreshToken() {
      return Vue.axios.post("api/v1/jwt/refresh/").then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      });
    },
    verifyToken({ state }) {
      return Vue.axios
        .post("api/v1/jwt/verify/", state.credentials)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
          }
        });
    },
    logUser({ state, commit }) {
      return Vue.axios
        .post("api/v1/jwt/create/", state.credentials)
        .then((res) => {
          if (res.status === 200) {
            const token = res.data.access;
            commit("setToken", token);
            localStorage.setItem("JWT", token);
            Vue.axios.defaults.headers.common["Authorization"] = "JWT " + token;
            router.push("/profile/photos/");
          } else {
            console.log("Authentification failed");
          }
        })
        .catch((err) => {
          console.log(err);
          state.errorLoginStatus = true;
          state.errorLoginMsg = "Incorrect username or password";
        });
    },
    logoutUser({ commit }) {
      commit("removeToken");
      localStorage.removeItem("JWT");
      if (router.currentRoute.name != "Home") {
        router.push("/");
      }
    },
  },
};
