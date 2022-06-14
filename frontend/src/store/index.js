import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";

import { userModule } from "./modules/user";
import { authModule } from "./modules/auth";
import { photoModule } from "./modules/photo";
import { demoModule } from "./modules/demo";
import { folderModule } from "./modules/folder";

import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    alertMsg: null,
    alertType: null,
    alertStatus: false,
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    updateAlert(state, prop) {
      state.alertMsg = prop.msg;
      state.alertType = prop.type;
      state.alertStatus = true;
    },
    resetAlert(state) {
      state.alertMsg = null;
      state.alertType = null;
      state.alertStatus = false;
    },
  },
  actions: {},
  modules: {
    user: userModule,
    auth: authModule,
    photo: photoModule,
    demo: demoModule,
    folder: folderModule,
  },
});
