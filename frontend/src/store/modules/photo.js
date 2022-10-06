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
    update(state, e) {
      const itemIndex = state.items.findIndex((x) => x.id === e.id);
      state.items[itemIndex].description = e.description;
      state.items[itemIndex].is_wip = e.is_wip;
    },
  },
  actions: {
    async getByPage({ state }, payload) {
      state.isLoading = true;
      return Vue.axios
        .get(
          "api/v1/photo/?page=" +
            payload.page +
            "&folder_id=" +
            payload.folder_id
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
    async getByName({ state }, payload) {
      return Vue.axios
        .get(
          "api/v1/photo/?name=" +
            payload.name +
            "&folder_id=" +
            payload.folder_id
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
        })
        .finally(() => {
          let uploadedFiles = formData.getAll("file");
          for (let i = 0; i < uploadedFiles.length; i++) {
            const fd = new FormData();
            fd.append("file", uploadedFiles[i]);
            fd.append("name", uploadedFiles[i].name);
            dispatch("describeOnUpload", fd);
          }
        });
    },
    async deleteById({ dispatch, state }, imageId) {
      return Vue.axios.delete("api/v1/photo/" + imageId).then((res) => {
        if (res.status === 204) {
          dispatch("getByPage", {
            page: state.actualPage,
            folder_id: this.state.folder.selectedFolder.id,
          });
        }
      });
    },
    async renameById({ dispatch, state }, payload) {
      return Vue.axios
        .patch("api/v1/photo/" + payload.id + "/", payload)
        .then((res) => {
          if (res.status === 200) {
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
    async describeOnUpload({ commit }, fd) {
      try {
        await Vue.axios
          .post("icg/", fd, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              commit("update", res.data[0]);
            }
          });
      } catch (e) {
        console.error(JSON.stringify(e));
      }
    },
  },
};
