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
      if (localStorage.getItem("Token")) {
        state.token = localStorage.getItem("Token")
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ""
      state.isAuthenticated = false
    },
  },
  actions: {
    logUser({ state, commit }) {
      return Vue.axios
        .post("api/v1/token/login/", state.credentials)
        .then((res) => {
          if (res.status === 200){
            const token = res.data.auth_token;
            commit("setToken", token);
            Vue.axios.defaults.headers.common["Authorization"] = "Token " + token;
            localStorage.setItem("Token", token);
            router.push("/profile/dashboard/");
          }else {
            console.log("pas bon")
          }
        })
        .catch((err) => {
          console.log(err);
          state.errorLoginStatus = true;
          state.errorLoginMsg = "Incorrect username or password";
        });
    },
    logoutUser({ commit }){
      commit("removeToken");
      localStorage.removeItem("Token")
      router.push("/");
    }
  },
};
