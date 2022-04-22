import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VueSession from "vue-session";

import axiosSetUp from "./helper/axios";
import axios from "axios";
import VueAxios from "vue-axios";

axiosSetUp()

Vue.config.productionTip = false;

Vue.use(VueSession);

Vue.use(require("vue-moment"));

new Vue({
  router,
  store,
  vuetify,
  axios,
  VueAxios,
  render: (h) => h(App),
}).$mount("#app");
