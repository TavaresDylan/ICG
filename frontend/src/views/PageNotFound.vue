<template>
  <v-main>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="10" class="col-xs-8 col-md-10 col-lg-7 col-xl-4">
          <v-img contain max-height="40vh" :src="require('../assets/taken.svg')"></v-img>
          <p class="text-center pa-6 display-1">Ooops ! You this page seems to has been kidnapped by some unknown creatures.</p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
