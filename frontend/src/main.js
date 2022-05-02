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

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('bytesize', function (bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
})

Vue.filter('extension', function (val) {
  if (!val) return ''
  return val.split('.').pop();
})

new Vue({
  router,
  store,
  vuetify,
  axios,
  VueAxios,
  render: (h) => h(App),
}).$mount("#app");
