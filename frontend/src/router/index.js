import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Store from "../store/index.js";

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
    component: () =>
      import(/*webpackChunckName: "demo" */ "../views/Demo.vue"),
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunckName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
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
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
