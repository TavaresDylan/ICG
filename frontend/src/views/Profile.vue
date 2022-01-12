<template>
  <v-main class="ma-0 pa-0">
    <v-tabs color="black" class="pt-3">
      <v-tabs-slider color="#CB275F"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item.title" :to="item.path">
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <router-view />
  </v-main>
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
          title: "Account settings",
          icon: "settings",
          path: "/profile/settings",
        },
      ],
      right: null,
    };
  },
  computed: {
    ...mapState("user", ["username"]),
  },
};
</script>
