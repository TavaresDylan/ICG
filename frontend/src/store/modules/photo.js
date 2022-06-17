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
    async upload({ state, dispatch }, formData) {
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
    async downloadFile({ commit }, payload) {
      try {
        await Vue.axios
          .get(payload.file, {
            responseType: "blob",
          })
          .then((res) => {
            const blob = new Blob([res.data], { type: "image/jpeg" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = payload.name;
            link.click();
            URL.revokeObjectURL(link.href);

          });
      } catch (e) {
        {
          commit(
            "updateAlert",
            {
              msg: "Sorry unable to download, try later.",
              type: "error",
            },
            { root: true }
          );
          console.error(JSON.stringify(e));
        }
      } finally {
        commit(
          "updateAlert",
          {
            msg: "Your download is complete.",
            type: "success",
          },
          { root: true }
        );
        setTimeout(() => {
          commit("resetAlert",{}, { root: true })
        }, 3000);
      }
    },
  },
};
