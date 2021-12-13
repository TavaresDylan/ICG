<template>
  <v-app id="app">
    <v-navigation-drawer v-model="sidebar" app>
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
        <router-link to="/" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token
    } else {
      axios.defaults.headers.common["Authorization"] = ""
    }
  },
  data() {
    return {
      appTitle: "ICG",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/", icon: "home" },
        { title: "About", path: "/about", icon: "info" },
        { title: "Demo", path: "/upload", icon: "file_upload" },
        { title: "Signup", path: "/signup", icon: "person_add"},
        { title: "Login", path: "/login", icon: "login"},
        { title: "Profile", path: "/profile/dashboard", icon: "account_circle"},
        { title: "Logout", path: "/logout", icon: "logout"},
      ],
    };
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
