<template>
  <v-container class="px-12">
    <v-row class="align-center">
      <picture-upload :page="page" class="ma-2"></picture-upload>
      <search-bar :items="items"></search-bar>
    </v-row>

    <v-row v-if="items.length > 0" class="ma-8 pa-8">
      <v-col cols="3" v-for="item in items" :key="item.name">
        <v-card>
          <v-card-title class="text-subtitle-1">
            {{ item.name }}
          </v-card-title>
          <v-img :src="'http://localhost:8085' + item.file"></v-img>
          <v-card-text v-if="item.description != 'undefined'">{{
            item.description
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-container v-if="items.length <= 0">
      <v-img
        contain
        max-height="460"
        :src="require('@/assets/search.png')"
      ></v-img>
      <p class="text-center font-weight-bold display-1">
        No files found, try to upload one 📸
      </p>
    </v-container>

    <v-pagination
      @click="getPage(page)"
      v-if="items.length > 0"
      class="py-6"
      @input="getPage(page)"
      v-model="page"
      :value="page"
      :length="len"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </v-container>
</template>

<script>
import PictureUpload from "@/components/PictureUpload.vue";
import SearchBar from "@/components/SearchBar.vue";
import { mapActions, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "photos",
  components: {
    PictureUpload,
    SearchBar,
  },
  data: () => ({
    len: 4,
  }),
  methods: {
    ...mapActions("auth", ["fetchUser"]),
    ...mapActions("upload", ["getAll", "getByPage", "getByName"]),
    getPage(page) {
      this.getByPage(page);
    },
  },
  computed: {
    ...mapFields("upload", ["page"]),
    ...mapState("upload", ["imgUrls", "imgNames", "imgDescs", "items"]),
  },
  mounted() {
    document.title = "Photos | ICG";
    this.fetchUser();
    this.getByPage(this.page);
  },
};
</script>
