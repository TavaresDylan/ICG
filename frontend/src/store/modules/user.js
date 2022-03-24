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
      return Vue.axios.get("/api/v1/users/me/", {
        headers: {
          "Authorization": "JWT " + localStorage.getItem("JWT"),
        },
      }).then((res) => {
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
    changePassword(){

    },
    registerUser() {
      return Vue.axios
        .post("/api/v1/users/", this.form)
        .then((res) => {
          if (res.status === 201) {
            this.success_msg = "Registration complete you can now login";
            this.$refs.form.reset();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
