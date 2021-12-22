import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/demo",
    component: () =>
      import(/*webpackChunckName: "about" */ "../views/Demo.vue"),
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunckName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    component: () =>
      import(/* webpackChunckName: "about" */ "../views/Signup.vue"),
  },
  {
    path: "/profile",
    component: () =>
      import(/* webpackChunckName: "about" */ "../views/Profile.vue"),
    children: [
      {
        path: "/profile/dashboard",
        component: () =>
          import(/* webpackChunckName: "about" */ "../views/profile/Dashboard.vue"),
      },
      {
        path: "/profile/photos",
        component: () =>
          import(/* webpackChunckName: "about" */ "../views/profile/Photos.vue"),
      },
      {
        path: "/profile/settings",
        component: () =>
          import(/* webpackChunckName: "about" */ "../views/profile/Settings.vue"),
      },
    ],
  },
  {
    path: "/api/user",
    component: () =>
      import(/* webpackChunckName: "about" */ "../views/Signup.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
