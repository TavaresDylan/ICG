<template>
  <v-app id="app">
    <v-navigation-drawer
      class="hidden-md-and-up"
      v-model="sidebar"
      disable-resize-watcher
      app
    >
      <v-list>
        <v-list-item
          v-for="item in menuItems"
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
      <v-toolbar-items
        v-if="!isAuthenticated"
        class="hidden-sm-and-down"
      >
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn text v-if="!isAuthenticated" to="/signup"
          ><v-icon left dark>mdi-account-plus</v-icon>Sign up</v-btn
        >
        <v-btn text v-if="!isAuthenticated" to="/login"
          ><v-icon left dark>mdi-login</v-icon>Log in</v-btn
        >
      </v-toolbar-items>
      <!-- IF USER IS AUTHENTICATED -->
      <v-toolbar-items
        v-if="isAuthenticated"
        class="hidden-sm-and-down"
      >
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          text
          v-if="isAuthenticated"
          to="/profile/dashboard"
          ><v-icon left dark>mdi-account-circle</v-icon>Profile</v-btn
        >
        <v-btn text v-if="isAuthenticated" @click="logout"
          ><v-icon left dark>mdi-logout</v-icon>Logout</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "App",
    beforeCreate() {
    this.$store.commit("auth/initializeStore");
    const token = this.$store.state.auth.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  computed: {
    ...mapState("auth",["isAuthenticated", "token"]),
  },
  data() {
    return {
      appTitle: "ICG",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/", icon: "home" },
        { title: "About", path: "/about", icon: "info" },
        { title: "Demo", path: "/demo", icon: "file_upload" },
      ],
    };
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
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
</style>
