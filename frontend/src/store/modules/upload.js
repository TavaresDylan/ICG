import Vue from "vue";
import { getField, updateField } from "vuex-map-fields";

export const uploadModule = {
  namespaced: true,
  state: () => ({
    items: [],
    actualPage: 1,
    imageCount: 0,
  }),
  getters: {
    getField,
  },
  mutations: {
    updateField,
    resetPage(state) {
      state.actualPage = 1;
    },
  },
  actions: {
    getByPage({ state }, payload) {
      return Vue.axios
        .get(
          "api/v1/upload/?page=" + payload.page + "&folder=" + payload.folder_id
        )
        .then((res) => {
          if (res.status === 200) {
            state.items = res.data.data;
            state.imageCount = res.data.count;
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
    getByName({ state }, name) {
      return Vue.axios
        .get("api/v1/upload/" + name)
        .then((res) => {
          if (res.status === 200) {
            state.items = res.data;
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
    upload({ state, dispatch }, formData) {
      return Vue.axios
        .post("api/v1/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 201) {
            dispatch("getByPage", {
              page: state.actualPage,
              folder_id: this.state.folder.selectedFolder.id,
            });
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
  },
};
