import Vue from "vue";
import { getField, updateField } from "vuex-map-fields";

export const demoModule = {
  namespaced: true,
  state: () => ({
    demoFile: [],
  }),
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
  actions: {
    post({ commit }, formData) {
      return Vue.axios
        .post("api/v1/demo/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(commit);
          if (res.status === 200) {
            console.log(res);
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
