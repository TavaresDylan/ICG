<template>
  <v-main>
    <v-tabs color="black" class="pt-3">
      <v-tabs-slider color="#CB275F"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item.title" :to="item.path">
        {{ item.title }}
      </v-tab>
      <v-spacer></v-spacer>
      <div v-if="loggedInUser != {}" class="d-flex justify-center align-center flex-end mr-4">
        {{loggedInUser.username | capitalize}}
      </div>
    </v-tabs>
    <router-view />
  </v-main>
</template>

<script>
import settings from "./dashboardSections/Settings.vue";
import { mapState } from "vuex";
export default {
  component: {
    settings,
  },
  data() {
    return {
      items: [
        { title: "Folders", icon: "image", path: "/dashboard/folders" },
        {
          title: "Account settings",
          icon: "settings",
          path: "/dashboard/settings",
        },
      ],
      right: null,
    };
  },
  computed: {
    ...mapState("auth", ["loggedInUser"]),
  },
};
</script>
