<template>
  <v-app class="container">
    <h1 class="text-center">Dashboard</h1>
    <v-avatar
      color="orange"
      size="62"
    >
      <span class="white--text text-h5">62</span>
    </v-avatar>
    <p>Membre depuis le {{ userCreateAt }}</p>
    <h2>Bienvenue sur ton profile {{ $store.state.username }}</h2>
    <p>Tu as un total de {{ nbPictures }} photos</p>
    <p>Status : {{ userStatus.statusName }} {{ userStatus.icon }}</p>
    <p>{{ $store.state.isAuthenticated }}</p>
    <div v-if="!$store.state.isAuthenticated"> okok </div>
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
      userCreateAt: "17/08/2021"
    };
  },
  computed: {
    ...mapState(["username"])
  }
};
</script>
