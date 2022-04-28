<template>
  <v-container class="px-12">
    <v-row class="align-center mt-2">
      <v-btn color="primary" @click="backToDashboard()"
        ><v-icon>home</v-icon> Back</v-btn
      >
      <picture-upload
        :searchLabel="'Search for a photo ...'"
        :actualPage="actualPage"
        class="ma-2"
      ></picture-upload>
      <search-bar :items="items"></search-bar>
    </v-row>

    <h1>Folder Name</h1>

    <v-row v-if="items.length > 0" class="ma-8 pa-8">
      <v-col cols="12" sm="6" md="3" v-for="item in items" :key="item.id">
        <v-card hover @click="zoomOnCard(item)">
          <v-img
            contain
            max-height="12vh"
            :src="'http://localhost:8085' + item.file"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dial" max-width="1400px">
      <v-card>
        <v-btn @click="closeModal()" class="ma-4" icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-img
          contain
          max-height="70vh"
          :src="'http://localhost:8085' + selectedItem.file"
        ></v-img>
        <v-card-text>
          <p class="subtitle-1">{{ selectedItem.name }}</p>
          <p v-if="selectedItem.description != 'undefined'">
            {{ selectedItem.description }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      @click="getPage(actualPage)"
      v-if="items.length > 1"
      class="py-6"
      @input="getPage(actualPage)"
      v-model="actualPage"
      :value="actualPage"
      :length="getNbPages()"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </v-container>
</template>

<script>
import PictureUpload from "@/components/PictureUpload.vue";
import SearchBar from "@/components/SearchBar.vue";
import router from "@/router/index.js";
import { mapActions, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "folderView",
  components: {
    PictureUpload,
    SearchBar,
  },
  data: () => ({
    routeId: "",
    dial: false,
    selectedItem: {},
  }),
  computed: {
    ...mapFields("upload", ["actualPage", "imageCount"]),
    ...mapState("upload", [
      "imgUrls",
      "imgNames",
      "imgDescs",
      "items",
      "isLoading",
    ]),
  },
  methods: {
    ...mapActions("auth", ["fetchUser"]),
    ...mapActions("upload", ["getByPage", "getByName", "getByFolderId"]),
    getRouteId() {
      this.routeId = this.$route.params.id;
    },
    backToDashboard() {
      router.push("/dashboard/folders");
    },
    getPage(actualPage) {
      this.getByPage(actualPage);
    },
    getNbPages() {
      return Math.ceil(this.imageCount / 8);
    },
    zoomOnCard(item) {
      this.dial = true;
      this.selectedItem = item;
    },
    closeModal() {
      this.dial = false;
    },
  },
  mounted() {
    document.title = "Photos | ICG";
    this.getRouteId();
    this.fetchUser();
    this.getByPage(this.actualPage);
  },
};
</script>
