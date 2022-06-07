import Vue from "vue";
import { getField, updateField } from "vuex-map-fields";

export const photoModule = {
  namespaced: true,
  state: () => ({
    items: [],
    actualPage: 1,
    imageCount: 0,
    isLoading: false,
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
    async getByPage({ state }, payload) {
      state.isLoading = true;
      return Vue.axios
        .get(
          "api/v1/photo/?page=" + payload.page + "&folder=" + payload.folder_id
        )
        .then((res) => {
          if (res.status === 200) {
            state.items = res.data.data;
            state.imageCount = res.data.count;
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        })
        .finally(() => {
          state.isLoading = false;
        });
    },
    getByName({ state }, name) {
      return Vue.axios
        .get("api/v1/photo/" + name)
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
        .post("api/v1/photo/", formData, {
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
    deleteById({ dispatch, state }, imageId) {
      return Vue.axios.delete("api/v1/photo/" + imageId).then((res) => {
        if (res.status === 204) {
          dispatch("getByPage", {
            page: state.actualPage,
            folder_id: this.state.folder.selectedFolder.id,
          });
        }
      });
    },
    renameById({dispatch, state}, payload) {
      return Vue.axios.patch("api/v1/photo/" + payload.id + "/", payload ).then((res) => {
          if (res.status  === 200){
            dispatch("getByPage", {
              page: state.actualPage,
              folder_id: this.state.folder.selectedFolder.id,
            });
          }
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
      });
    }
  },
};
