<template>
  <v-container class="px-12">
    <v-row class="align-center">
      <create-folder :actualPage="actualPage" class="ma-2"></create-folder>
      <search-bar :searchLabel="'Search for a folder ...'" :items="folders"></search-bar>
    </v-row>

    <v-row v-if="folders.length > 0">
      <v-col cols="12" sm="6" md="6" lg="3" v-for="folder in folders" :key="folder.id">
        <v-card hover @click="redirectOnFolder(folder)"
          >
          <v-container class="d-flex">
            <v-card-title>{{ folder.name }}</v-card-title>
            <v-icon class="ml-2" x-large>folder</v-icon>
            </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-container v-if="folders.length <= 0">
      <v-img
        class="mb-4"
        contain
        max-height="460"
        :src="require('@/assets/folder.svg')"
      ></v-img>
      <p class="text-center font-weight-bold display-1">
        No folders found, try to create one 📁
      </p>
    </v-container>

    <v-pagination
      @click="getPage(actualPage)"
      @input="getPage(actualPage)"
      v-if="getNbPages() > 1"
      class="py-6"
      v-model="actualPage"
      :value="actualPage"
      :length="getNbPages()"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </v-container>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import CreateFolder from "@/components/CreateFolder.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import router from "@/router/index";
import { mapFields } from "vuex-map-fields";
export default {
  name: "photos",
  components: {
    SearchBar,
    CreateFolder,
  },
  methods: {
    ...mapActions("auth", ["fetchUser"]),
    ...mapActions("folder", ["getAllFolders"]),
    ...mapMutations("folder", ["selectedFolder"]),
    redirectOnFolder(folder){
      this.selectedFolder(folder)
      router.push("/dashboard/folders/"+folder.id)
    },
    getPage(actualPage){
      this.getAllFolders(actualPage)
    },
    getNbPages(){
      return Math.ceil(this.folderCount / 8)
    }
  },
  computed: {
    ...mapState("folder", ["folders", "folderCount"]),
    ...mapFields("folder", ["actualPage"]),
  },
  mounted() {
    document.title = "Dashboard | ICG";
    this.fetchUser();
    this.getAllFolders(this.actualPage);
  },
};
</script>
