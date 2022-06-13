import Vue from "vue";
import router from "@/router/index.js";
import { getField, updateField } from "vuex-map-fields";

export const folderModule = {
  namespaced: true,
  state: {
    folders: [],
    folderCount: 0,
    actualPage: 1,
    selectedFolder: {},
    isLoading: false,
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    selectedFolder(state, folder) {
      state.selectedFolder = folder;
    },
  },
  actions: {
    async createFolder({ state, dispatch }, folderinfos) {
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
    async deleteFolderById({ state, dispatch }, id) {
      return Vue.axios
        .delete("api/v1/folder/" + id)
        .then((res) => {
          if (res.status === 204) {
            dispatch("getAllFolders", state.actualPage);
            if (router.currentRoute.path != "/dashboard/folders") {
              router.push("/dashboard/folders");
            }
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
    async getFolderByName({ state }, payload) {
      return Vue.axios.get("api/v1/folder/?name=" + payload.name).then((res) => {
        if (res.status === 200) {
          state.folders = res.data.data;
        }
      });
    },
    async getAllFolders({ state }, page) {
      state.isLoading = true;
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
        })
        .finally(() => {
          state.isLoading = false;
        });
    },
    async renameFolderById({ dispatch, state }, payload) {
      return Vue.axios
        .patch("api/v1/folder/" + payload.folderId + "/", {
          name: payload.newName,
          user_id: payload.userId,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch("getAllFolders", state.actualPage);
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
    },
  },
};
