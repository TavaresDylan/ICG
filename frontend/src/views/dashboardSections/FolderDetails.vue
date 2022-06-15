<template>
  <v-container class="px-12">
    <!-- TOOLBAR -->
    <v-row class="align-center mt-2">
      <v-btn class="mr-8" icon color="primary" @click="backToDashboard()"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <picture-upload :actualPage="actualPage" class="ma-2"></picture-upload>
      <search-bar
        :page="actualPage"
        :searchLabel="'Search for a photo ...'"
      ></search-bar>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="confirmDelete = true"
            class="ml-8"
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Delete this folder</span>
      </v-tooltip>
    </v-row>

    <!-- LOADER -->
    <v-progress-linear
      class="mb-4"
      indeterminate
      rounded
      color="#B83AC2"
      v-if="isLoading"
    ></v-progress-linear>

    <!-- CONFIRM DELETE MODAL -->
    <v-row justify="center">
      <v-dialog v-model="confirmDelete" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5"> Are you sure ? </v-card-title>
          <v-card-text
            >This will delete "{{ selectedFolder.name }}" folder and all files
            which are in it definitely</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="confirmDelete = false">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="deleteFolder(selectedFolder.id)"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <h1 class="pt-6">{{ selectedFolder.name }}</h1>

    <!-- TOOLBAR MULTI SELECTIONS AND ACTIONS -->
    <v-row v-if="items.length > 0" align="center">
      <v-checkbox v-model="selectAll" label="select all"></v-checkbox>

      <v-tooltip v-if="selectedImages.length > 0" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-3"
            @click="deleteImages(selectedImages)"
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Delete selected images</span>
      </v-tooltip>
    </v-row>

    <!-- IMAGE CARDS -->
    <v-row v-if="items.length > 0 && !isLoading" class="mb-8">
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="3"
        v-for="item in items"
        :key="item.id"
      >
        <v-card
          @contextmenu.prevent
          min-height="100%"
          class="d-flex flex-column"
          hover
          @click="zoomOnCard(item)"
        >
          <div class="d-flex card-title-bar align-center">
            <v-checkbox
              class="ma-0 py-2 pl-2"
              hide-details
              :ripple="false"
              @click.stop.prevent
              dark
              color="white"
              :value="item.id"
              v-model="selectedImages"
            ></v-checkbox>
            <p class="white--text font-weight-bold text-truncate ma-0">
              {{ item.name }}
            </p>
          </div>
          <v-img
            position="center center"
            max-height="22vh"
            :src="'http://localhost:8085' + item.file"
          >
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- ZOOMED IMAGE CARD -->
    <v-dialog @click:outside="renameForm = false" v-model="dial" width="700px">
      <v-card flat tile>
        <v-row justify="space-between" class="pa-0 ma-0">
          <div class="d-flex align-center">
            <v-form
              @submit.prevent="renamePhoto(selectedItem.id, selectedItem.name)"
              ref="renameForm"
              v-if="renameForm"
              class="d-flex align-center pl-4"
            >
              <v-text-field
                :rules="[(v) => v.length > 0 || 'Name should not be empty.']"
                v-model="selectedItem.name"
              ></v-text-field>
              <v-btn
                submit
                @click="renamePhoto(selectedItem.id, selectedItem.name)"
                icon
                ><v-icon color="success">mdi-check</v-icon></v-btn
              >
            </v-form>
            <v-card-title v-if="!renameForm" class="ma-0 pl-4 py-0"
              >{{ selectedItem.name | capitalize }}
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="renameForm = true"
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    <v-icon color="primary">mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Rename</span>
              </v-tooltip>
            </v-card-title>
          </div>
          <v-btn @click="closeModal()" class="my-3 mr-3" icon>
            <v-icon color="red">close</v-icon>
          </v-btn>
        </v-row>
        <v-img
          contain
          width="700px"
          :src="'http://localhost:8085' + selectedItem.file"
        ></v-img>
        <v-card-text v-if="infos" class="pa-2">
          <p v-if="selectedItem.description != 'undefined'">
            {{ selectedItem.description }}
          </p>
          <p>
            Last modified :
            {{ selectedItem.updated_at | moment("DD-MM-YYYY HH:mm:ss") }}
          </p>
          <p>
            Uploaded at :
            {{ selectedItem.upload_date | moment("DD-MM-YYYY HH:mm") }}
          </p>
          <p><v-icon>mdi-weight</v-icon> {{ selectedItem.size | bytesize }}</p>
          <p>{{ selectedItem.file | extension }}</p>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon color="blue" @click="downloadFile(selectedItem.file, selectedItem.name)"
                  >mdi-download</v-icon
                >
              </v-btn>
            </template>
            <span>Download</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox
                  hide-details
                  on-icon="mdi-information"
                  off-icon="mdi-information"
                  color="primary"
                  v-model="infos"
                  class="pa-0 ma-0 pr-1"
                ></v-checkbox>
              </span>
            </template>
            <span>Infos</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- PLACEHOLDER -->
    <v-container v-if="items.length <= 0 && !isLoading">
      <v-img
        contain
        max-height="460"
        :src="require('@/assets/search.png')"
      ></v-img>
      <p class="text-center font-weight-bold display-1">
        No files found, try to upload one 📸
      </p>
    </v-container>

    <!-- PAGINATION -->
    <div class="text-center">
      <v-pagination
        @click="getPage()"
        v-if="getNbPages() > 1"
        class="py-6"
        @input="getPage()"
        v-model="actualPage"
        total-visible="7"
        :length="getNbPages()"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import PictureUpload from "@/components/PictureUpload.vue";
import SearchBar from "@/components/SearchBar.vue";
import router from "@/router/index.js";
import { mapActions, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import Axios from "axios";
export default {
  name: "folderView",
  components: {
    PictureUpload,
    SearchBar,
  },
  data: () => ({
    infos: false,
    routeId: "",
    dial: false,
    confirmDelete: false,
    selectedItem: {},
    selectedImages: [],
    renameForm: false,
    rules: { minName: (v) => v.lenght > 0 || "Name should not be empty" },
  }),
  watch: {
    items(newitems, olditems) {
      if (newitems != olditems && Object.keys(this.selectedItem).length > 0) {
        let id = this.selectedItem.id;
        this.selectedItem.updated_at = newitems[id - 1].updated_at;
      }
    },
  },
  computed: {
    ...mapFields("photo", ["actualPage", "imageCount"]),
    ...mapState("photo", [
      "imgUrls",
      "imgNames",
      "imgDescs",
      "items",
      "isLoading",
    ]),
    ...mapState("folder", ["selectedFolder"]),
    ...mapState("auth", ["loggedInUser"]),
    selectAll: {
      get() {
        return this.selectedImages.length === this.items.length;
      },
      set(value) {
        this.selectedImages = [];

        if (value) {
          this.items.forEach((item) => {
            this.selectedImages.push(item.id);
          });
        }
      },
    },
  },
  methods: {
    ...mapActions("auth", ["fetchUser"]),
    ...mapActions("photo", [
      "getByPage",
      "getByName",
      "getByFolderId",
      "deleteById",
      "renameById",
    ]),
    ...mapActions("folder", ["deleteFolderById"]),
    getRouteId() {
      this.routeId = this.$route.params.id;
    },
    backToDashboard() {
      router.push("/dashboard/folders");
    },
    getPage() {
      this.getByPage({
        page: this.actualPage,
        folder_id: this.selectedFolder.id,
      });
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
      this.renameForm = false;
    },
    deleteFolder(id) {
      this.confirmDelete = false;
      this.deleteFolderById(id);
    },
    deleteImages(selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        this.deleteById(selectedImages[i]);
      }
    },
    renamePhoto(photoId, newName) {
      if (this.$refs.renameForm.validate() === true) {
        this.renameById({
          id: photoId,
          userId: this.loggedInUser.id,
          name: newName,
        });
        this.renameForm = false;
      }
    },
    downloadFile(file, filename) {
      Axios.get('http://localhost:8085'+file, { responseType: "blob" }).then((response) => {
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
      });
    },
  },
  mounted() {
    document.title = "Photos | ICG";
    this.getRouteId();
    this.fetchUser();
    this.getByPage({
      page: this.actualPage,
      folder_id: this.selectedFolder.id,
    });
  },
};
</script>

<style lang="scss" scoped>
.card-title-bar {
  background: linear-gradient(
    95deg,
    rgba(251, 84, 111, 1) 0%,
    rgba(221, 21, 107, 1) 54%,
    rgba(207, 44, 125, 1) 100%
  );
}
</style>
