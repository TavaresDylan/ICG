import Vue from "vue";
import { getField, updateField } from "vuex-map-fields";

export const uploadModule = {
  namespaced: true,
  state: () => ({
    items: [],
    page: 1,
  }),
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
  actions: {
    getAll({ state }) {
      return Vue.axios
        .get("api/v1/upload/")
        .then((res) => {
          if (res.status === 200) {
            state.items = res.data
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
    getByPage({state}, npage){
      return Vue.axios
        .get("api/v1/upload/?page="+npage)
        .then((res) => {
          if (res.status === 200) {
            state.items = res.data
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
    getByName({ state }, name) {
      return Vue.axios
        .get("api/v1/upload/"+name)
        .then((res) => {
          if (res.status === 200) {
            state.items = res.data
          }
        })
    },
    upload({ state, dispatch }, formData) {
      return Vue.axios
        .post("api/v1/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch("getByPage", state.page);
          } else {
            console.log("Request error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
