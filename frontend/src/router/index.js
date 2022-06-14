import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Store from "../store/index.js";
import PageNotFound from "@/views/PageNotFound";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import(/*webpackChunckName: "demo" */ "../views/Demo.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunckName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunckName: "signup" */ "../views/Signup.vue"),
  },
  {
    path: "/dashboard",
    component: () =>
      import(/* webpackChunckName: "profile" */ "../views/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      if (Store.state.auth.isAuthenticated == false) {
        router.push("/");
      } else {
        next();
      }
    },
    children: [
      {
        path: "/dashboard/folders/:id",
        props: true,
        name: "FoldersDetails",
        component: () =>
          import(
            /* webpackChunckName "folderdetails" */ "../views/dashboardSections/FolderDetails.vue"
          )
      },
      {
        path: "/dashboard/folders",
        name: "Photos",
        component: () =>
          import(
            /* webpackChunckName: "photos" */ "../views/dashboardSections/FoldersView.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (Store.state.auth.isAuthenticated == false) {
            router.push("/");
          } else {
            next();
          }
        },
      },
      {
        path: "/dashboard/settings",
        name: "Settings",
        component: () =>
          import(
            /* webpackChunckName: "settings" */ "../views/dashboardSections/Settings.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (Store.state.auth.isAuthenticated == false) {
            router.push("/");
          } else {
            next();
          }
        },
      },
    ],
  },
  { path: "*", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.state.alertStatus == true) {
    store.commit("resetAlert")
    next()
  } else{
    next()
  }
})

export default router;
