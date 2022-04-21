<template>
  <v-container class="px-12">
    <v-row>
      <picture-upload class="ma-2"></picture-upload>
    </v-row>

    <v-row v-if="imgUrls.length > 0" class="ma-8 pa-8">
      <v-col cols="3" v-for="(img, index) in imgUrls" :key="img">
        <v-card>
          <v-card-title class="text-subtitle-1">
            {{ imgNames[index] }}
          </v-card-title>
          <v-img :src="'http://localhost:8085' + img"></v-img>
          <v-card-text v-if="imgDescs[index] != 'undefined'">{{
            imgDescs[index]
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-container v-if="imgUrls.length <= 0">
      <v-img contain max-height="460" :src="require('@/assets/search.png')"></v-img>
      <p class="text-center font-weight-bold display-1">No files found, try to upload one 📸</p>
    </v-container>

    <v-pagination
      v-if="imgUrls.length > 0"
      class="py-6"
      v-model="page"
      :length="4"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </v-container>
</template>

<script>
import PictureUpload from "@/components/PictureUpload.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "photos",
  components: {
    PictureUpload,
  },
  data: () => ({
    page: 1,
  }),
  methods: {
    ...mapActions("auth", ["fetchUser"]),
  },
  computed: {
    ...mapState("upload", ["imgUrls", "imgNames", "imgDescs"]),
  },
  mounted() {
    document.title = "Photos | ICG";
    this.fetchUser();
  },
};
</script>
