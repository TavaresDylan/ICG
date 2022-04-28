import Vue from "vue";
import { getField, updateField } from "vuex-map-fields";

export const folderModule = {
  namespaced: true,
  state: {
    folders: [],
    folderCount: 0,
    actualPage: 1,
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
  actions: {
    createFolder({ state, dispatch }, folderinfos) {
      return Vue.axios
        .post("api/v1/folder/", folderinfos)
        .then((res) => {
          if (res.status === 201) {
            dispatch("getAllFolders", state.actualPage);
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
    getFolderByName({ state }, name) {
      return Vue.axios.get("api/v1/folder/" + name).then((res) => {
        if (res.status === 200) {
          state.folders = res.data;
        }
      });
    },
    getAllFolders({ state }, page) {
      return Vue.axios
        .get("api/v1/folder/?page=" + page)
        .then((res) => {
          if (res.status === 200) {
            state.folders = res.data.data;
            state.folderCount = res.data.count;
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
  },
};
