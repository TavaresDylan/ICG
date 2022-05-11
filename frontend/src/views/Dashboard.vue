<template>
  <v-main>
    <v-tabs color="black" class="pt-3">
      <v-tabs-slider color="#CB275F"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item.title" :to="item.path">
        <v-icon class="pr-2">{{ item.icon }}</v-icon
        >{{ item.title }}
      </v-tab>
      <v-spacer></v-spacer>
      <div
        v-if="loggedInUser != {}"
        class="d-flex justify-center align-center flex-end mr-4"
      >
        {{ loggedInUser.username | capitalize }}
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
        {
          title: "Folders",
          icon: "mdi-folder-multiple",
          path: "/dashboard/folders",
        },
        {
          title: "Settings",
          icon: "mdi-account-cog",
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
