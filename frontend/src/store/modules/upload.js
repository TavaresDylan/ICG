import Vue from "vue";
import { getField, updateField } from "vuex-map-fields";

export const uploadModule = {
  namespaced: true,
  state: () => ({
    imgUrls: [],
    imgNames: [],
    imgDescs: [],
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
        .get("api/v1/upload/?page=1")
        .then((res) => {
          if (res.status === 200) {
            state.imgUrls = [];
            state.imgNames = [];
            state.imgDescs = [];
            for (let i = 0; i < res.data.length; i++) {
              state.imgUrls.push(res.data[i].file);
              state.imgNames.push(res.data[i].name);
              state.imgDescs.push(res.data[i].description);
            }
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
    upload({ dispatch }, formData) {
      return Vue.axios
        .post("api/v1/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            dispatch("getAll");
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
