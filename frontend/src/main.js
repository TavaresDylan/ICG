import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VueTyperPlugin from "vue-typer";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  VueTyperPlugin,
  render: (h) => h(App),
}).$mount("#app");
