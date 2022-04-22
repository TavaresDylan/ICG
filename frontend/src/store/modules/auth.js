import Vue from "vue";
import router from "@/router/index";
import { getField, updateField } from "vuex-map-fields";

export const authModule = {
  namespaced: true,
  state: () => ({
    token: "",
    refreshToken: "",
    isAuthenticated: false,
    errorLoginMsg: "",
    errorLoginStatus: false,
    loggedInUser: {},
  }),
  getters: {
    getField,
    token: (state) => state.token,
  },
  mutations: {
    updateField,
    initializeStore(state) {
      if (localStorage.getItem("JWT")) {
        state.token = localStorage.getItem("JWT");
        state.isAuthenticated = true;
        state.refreshToken = localStorage.getItem("Refresh");
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    setLoggedInUser: function (state, user) {
      state.loggedInUser = user;
      state.isAuthenticated = true;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("JWT", token);
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = "";
      localStorage.removeItem("JWT");
      localStorage.removeItem("Refresh");
      state.isAuthenticated = false;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem("Refresh", refreshToken);
    },
    clearUserData(state) {
      state.token = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
    },
    setError(state, errorMsg) {
      state.errorLoginMsg = errorMsg;
      state.errorLoginStatus = true;
    },
    resetError(state) {
      if (state.errorLoginStatus != state) {
        state.errorLoginMsg = "";
        state.errorLoginStatus = false;
      }
    },
  },
  actions: {
    refreshToken: async ({ state, commit }) => {
      try {
        await Vue.axios
          .post("api/v1/jwt/refresh/", { refresh: state.refreshToken })
          .then((res) => {
            if (res.status === 200) {
              commit("setToken", res.data.access);
            }
          });
      } catch (e) {
        console.error(JSON.stringify(e));
      }
    },
    logUser: async ({ commit, dispatch }, creds) => {
      return Vue.axios
        .post("api/v1/jwt/create/", creds)
        .then((res) => {
          if (res.status === 200) {
            const token = res.data.access;
            const refreshToken = res.data.refresh;
            commit("setToken", token);
            commit("setRefreshToken", refreshToken);
            Vue.axios.defaults.headers.common["Authorization"] = "JWT " + token;
            dispatch("fetchUser");
            router.push("/profile/photos/");
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
          commit("setError", err.response.data.detail);
        });
    },
    fetchUser: async ({ commit }) => {
      const currentUserUrl = "/api/v1/users/me/";
      try {
        await Vue.axios.get(currentUserUrl).then((response) => {
          if (response.status === 200) {
            commit("setLoggedInUser", response.data);
          }
        });
      } catch (e) {
        console.error(JSON.stringify(e));
      }
    },
    logoutUser({ commit }) {
      commit("clearUserData");
      if (router.currentRoute.name != "Home") {
        router.push("/");
      }
    },
  },
};
