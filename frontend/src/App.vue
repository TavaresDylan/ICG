<template>
  <v-app id="app">
    <v-navigation-drawer
      id="mobile-nav"
      class="hidden-md-and-up"
      v-model="sidebar"
      disable-resize-watcher
      app
    >
      <!-- IF USER IS AUTHENTICATED -->
      <v-list v-if="isAuthenticated">
        <v-list-item v-for="item in menuCon" :key="item.title" :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
        <v-list-item class="d-flex justify-center pt-6"
          ><v-btn color="primary" @click="logout"
            ><v-icon dark>mdi-logout</v-icon>Logout</v-btn
          ></v-list-item
        >
      </v-list>

      <!-- IF USER IS NOT AUTHENTICATED -->
      <v-list v-if="!isAuthenticated">
        <v-list-item
          v-for="item in menuNotcon"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"> </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title id="title">
        <router-link class="d-flex" to="/" style="cursor: pointer">
          <img
            src="https://img.icons8.com/fluency/48/000000/stack-of-photos.png"
          />{{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- IF USER IS NOT AUTHENTICATED -->
      <v-toolbar-items v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn
          text
          v-for="item in menuNotcon"
          :key="item.title"
          :to="item.path"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <!-- IF USER IS AUTHENTICATED -->
      <v-toolbar-items v-if="isAuthenticated" class="hidden-sm-and-down">
        <v-btn text v-for="item in menuCon" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn text @click="logout"
          ><v-icon left dark>mdi-logout</v-icon>Logout</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>

    <!-- ALERT BAR -->
    <v-alert
      class="alert ma-0"
      width="370px"
      :value="alertStatus"
      elevation="4"
      dense
      colored-border
      border="left"
      :type="alertType"
      dismissible
      @click="resetAlert()"
      transition="scroll-y-reverse-transition"
      >{{ alertMsg }}</v-alert
    >

    <router-view />

    <svg
      id="wave"
      style="transform: rotate(0deg); transition: 0.3s"
      viewBox="0 0 4440 490"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
          <stop stop-color="rgba(216.75, 69.823, 69.823, 1)" offset="0%"></stop>
          <stop
            stop-color="rgba(200.813, 32.94, 101.472, 1)"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
      <path
        style="transform: translate(0, 0px); opacity: 1"
        fill="url(#sw-gradient-0)"
        d="M0,0L120,32.7C240,65,480,131,720,179.7C960,229,1200,261,1440,302.2C1680,343,1920,392,2160,383.8C2400,376,2640,310,2880,285.8C3120,261,3360,278,3600,302.2C3840,327,4080,359,4320,383.8C4560,408,4800,425,5040,392C5280,359,5520,278,5760,220.5C6000,163,6240,131,6480,98C6720,65,6960,33,7200,89.8C7440,147,7680,294,7920,318.5C8160,343,8400,245,8640,196C8880,147,9120,147,9360,155.2C9600,163,9840,180,10080,196C10320,212,10560,229,10800,220.5C11040,212,11280,180,11520,212.3C11760,245,12000,343,12240,359.3C12480,376,12720,310,12960,294C13200,278,13440,310,13680,326.7C13920,343,14160,343,14400,294C14640,245,14880,147,15120,163.3C15360,180,15600,310,15840,359.3C16080,408,16320,376,16560,302.2C16800,229,17040,114,17160,57.2L17280,0L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
      ></path>
      <defs>
        <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
          <stop stop-color="rgba(149.228, 80.388, 153, 1)" offset="0%"></stop>
          <stop
            stop-color="rgba(189.139, 16.292, 205.366, 1)"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
      <path
        style="transform: translate(0, 50px); opacity: 0.9"
        fill="url(#sw-gradient-1)"
        d="M0,441L120,416.5C240,392,480,343,720,269.5C960,196,1200,98,1440,65.3C1680,33,1920,65,2160,89.8C2400,114,2640,131,2880,147C3120,163,3360,180,3600,212.3C3840,245,4080,294,4320,261.3C4560,229,4800,114,5040,98C5280,82,5520,163,5760,196C6000,229,6240,212,6480,212.3C6720,212,6960,229,7200,236.8C7440,245,7680,245,7920,236.8C8160,229,8400,212,8640,187.8C8880,163,9120,131,9360,114.3C9600,98,9840,98,10080,138.8C10320,180,10560,261,10800,245C11040,229,11280,114,11520,73.5C11760,33,12000,65,12240,122.5C12480,180,12720,261,12960,302.2C13200,343,13440,343,13680,334.8C13920,327,14160,310,14400,253.2C14640,196,14880,98,15120,122.5C15360,147,15600,294,15840,302.2C16080,310,16320,180,16560,179.7C16800,180,17040,310,17160,375.7L17280,441L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
      ></path>
      <defs>
        <linearGradient id="sw-gradient-2" x1="0" x2="0" y1="1" y2="0">
          <stop
            stop-color="rgba(184.875, 31.369, 62.833, 1)"
            offset="0%"
          ></stop>
          <stop
            stop-color="rgba(168.938, 8.633, 106.662, 1)"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
      <path
        style="transform: translate(0, 100px); opacity: 0.8"
        fill="url(#sw-gradient-2)"
        d="M0,245L120,269.5C240,294,480,343,720,318.5C960,294,1200,196,1440,179.7C1680,163,1920,229,2160,228.7C2400,229,2640,163,2880,171.5C3120,180,3360,261,3600,253.2C3840,245,4080,147,4320,138.8C4560,131,4800,212,5040,269.5C5280,327,5520,359,5760,359.3C6000,359,6240,327,6480,334.8C6720,343,6960,392,7200,400.2C7440,408,7680,376,7920,343C8160,310,8400,278,8640,220.5C8880,163,9120,82,9360,114.3C9600,147,9840,294,10080,302.2C10320,310,10560,180,10800,138.8C11040,98,11280,147,11520,179.7C11760,212,12000,229,12240,245C12480,261,12720,278,12960,245C13200,212,13440,131,13680,155.2C13920,180,14160,310,14400,318.5C14640,327,14880,212,15120,204.2C15360,196,15600,294,15840,277.7C16080,261,16320,131,16560,130.7C16800,131,17040,261,17160,326.7L17280,392L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
      ></path>
    </svg>

    <v-footer padless>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>All rights reserved ICG ©</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "App",
  beforeCreate() {
    this.$store.commit("auth/initializeStore");
  },
  computed: {
    ...mapState("auth", ["isAuthenticated", "token"]),
    ...mapState(["alertMsg", "alertType", "alertStatus"]),
  },
  data() {
    return {
      appTitle: "ICG",
      sidebar: false,
      menuNotcon: [
        { title: "Home", path: "/", icon: "home" },
        { title: "About", path: "/about", icon: "info" },
        { title: "Demo", path: "/demo", icon: "file_upload" },
        { title: "Signup", path: "/signup", icon: "mdi-account-plus" },
        { title: "Login", path: "/login", icon: "login" },
      ],
      menuCon: [
        { title: "Home", path: "/", icon: "home" },
        { title: "About", path: "/about", icon: "info" },
        { title: "Demo", path: "/demo", icon: "file_upload" },
        {
          title: "Dashboard",
          path: "/dashboard/folders",
          icon: "mdi-account-circle",
        },
      ],
    };
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    ...mapMutations(["resetAlert"]),
    logout() {
      this.logoutUser();
    },
  },
};
</script>

<style lang="scss">
#title {
  a {
    text-decoration: none;
    color: black;
    font-family: "Oswald", sans-serif;
    font-weight: bold;
  }
}
.alert {
  position: fixed !important;
  z-index: 2000;
  top: 8rem;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
}
#mobile-nav {
  z-index: 1000;
}
footer {
  background-color: #b0205e !important;
}
</style>
