import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Store from "../store/index.js";
import PageNotFound from "@/views/PageNotFound";

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
    path: "/profile",
    component: () =>
      import(/* webpackChunckName: "profile" */ "../views/Profile.vue"),
    beforeEnter: (to, from, next) => {
      if (Store.state.auth.isAuthenticated == false) {
        router.push("/");
      } else {
        next();
      }
    },
    children: [
      {
        path: "/profile/dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunckName: "dashboard" */ "../views/profile/Dashboard.vue"
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
        path: "/profile/photos",
        name: "Photos",
        component: () =>
          import(
            /* webpackChunckName: "photos" */ "../views/profile/Photos.vue"
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
        path: "/profile/settings",
        name: "Settings",
        component: () =>
          import(
            /* webpackChunckName: "settings" */ "../views/profile/Settings.vue"
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

export default router;
