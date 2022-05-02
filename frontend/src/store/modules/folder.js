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
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    selectedFolder(state, folder){
      state.selectedFolder = folder
    }
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
    deleteFolderById({state}, id){
      return Vue.axios.delete("api/v1/folder/"+id).then((res) => {
        if (res.status === 204){
          console.log("Succefully deleted", state.selectedFolder.name)
          router.push("/dashboard/folders")
        }
      }).catch((err) => {
        console.error(JSON.stringify(err))
      })
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
