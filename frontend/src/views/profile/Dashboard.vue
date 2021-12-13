<template>
  <v-app class="container">
    <h1 class="text-center">Dashboard</h1>
    <h2>Bienvenue sur ton profile {{ $store.state.username }}</h2>
    <p>Tu as un total de {{ nbPictures }} photos</p>
    <p>Status : {{ userStatus.statusName }} {{ userStatus.icon }}</p>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "dashboard",
  data: () => {
    return {
      nbPictures: 423,
      userStatus: { statusName: "Diamond", icon: "💎" },
    };
  },
  computed: {
    ...mapState(["username"])
  }
};
</script>
