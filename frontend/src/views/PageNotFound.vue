<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" class="col-xs-8 col-md-10 col-lg-7 col-xl-4">
        <v-img contain :src="require('../assets/404.png')"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
