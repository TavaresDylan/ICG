import Vue from "vue";
import router from "@/router/index";
import { getField, updateField } from "vuex-map-fields";

export const userModule = {
  namespaced: true,
  state: () => ({
    username: "",
    email: "",
    date_joined: "",
    current_password: "",
    new_username: "",
  }),
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
  actions: {
    getUser({ state }) {
      return Vue.axios
        .get("/api/v1/users/me/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("JWT"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            state.username = res.data.username;
            state.email = res.data.email;
            state.date_joined = res.data.date_joined;
          }
        });
    },
    deleteUser({ state }) {
      return Vue.axios
        .delete("/api/v1/users/me/", {
          data: { current_password: state.current_password },
        })
        .then((res) => {
          if (res.status === 204) {
            router.push("/");
          }
        })
        .catch((err) => {
          console.error(err.toJSON());
        });
    },
    changeUsername({ state }) {
      return Vue.axios
        .post("/api/v1/users/set_username/", {
            current_password: state.current_password,
            new_username: state.new_username,
        })
        .then(
          console.log("ok renamed")
        );
    },
    registerUser: async ({ commit }, form) => {
      try {
        await Vue.axios.post("/api/v1/users/", form).then((res) => {
          if (res.status === 201) {
            commit(
              "updateAlert",
              {
                msg: "Succefully registrated you can login 😀",
                type: "success",
              },
              { root: true }
            );
          }
        });
      } catch (e) {
        {
          commit(
            "updateAlert",
            {
              msg: e.response.data.username.toString(),
              type: "error",
            },
            { root: true }
          );
          console.error(JSON.stringify(e));
        }
      }
    },
  },
};
