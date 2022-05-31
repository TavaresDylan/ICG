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
  getters: {
    getField,
  },
  mutations: {
    updateField,
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
