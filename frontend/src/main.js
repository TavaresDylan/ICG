import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VueTyperPlugin from "vue-typer";
import VueSession from "vue-session";

import axios from "axios";
import VueAxios from 'vue-axios';

Vue.axios.defaults.baseURL = "http://127.0.0.1:8085"

Vue.config.productionTip = false;

Vue.use(VueSession);

Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  vuetify,
  axios,
  VueAxios,
  VueTyperPlugin,
  render: (h) => h(App),
}).$mount("#app");
