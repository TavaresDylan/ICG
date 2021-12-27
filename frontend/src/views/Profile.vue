<template>
  <v-app class="d-flex">
    <div>
      <router-view />
    </div>
    <div>
      <v-navigation-drawer app permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Mon compte </v-list-item-title>
            <v-list-item-subtitle> {{ username }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </v-app>
</template>

<script>
import settings from "./profile/Settings.vue";
import { mapState } from "vuex";
export default {
  component: {
    settings,
  },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "dashboard", path: "/profile/dashboard" },
        { title: "Photos", icon: "image", path: "/profile/photos" },
        {
          title: "Paramètres du compte",
          icon: "settings",
          path: "/profile/settings",
        },
      ],
      right: null,
    };
  },
  computed: {
      ...mapState('user',["username"]),
    },
};
</script>
