<template>
  <v-container class="px-12">
    <!-- TOOLBAR -->
    <v-row class="align-center mt-2">
      <create-folder :actualPage="actualPage" class="ma-2"></create-folder>
      <search-bar
        :searchLabel="'Search for a folder ...'"
        :page="actualPage"
      ></search-bar>
    </v-row>

    <v-row v-if="folders.length > 1" align="center">
      <v-checkbox label="select all" v-model="selectAll"></v-checkbox>
      <v-tooltip v-if="selectedFolders.length > 0" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-3"
            v-bind="attrs"
            v-on="on"
            @click="confirmDelete = true"
            icon
          >
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Delete selected folders</span>
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

    <!-- DELETE MODAL -->
    <v-row justify="center">
      <v-dialog multiple v-model="confirmDelete" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5"> Are you sure ? </v-card-title>
          <v-card-text
            >This will delete folder and all files which are in it
            definitely</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="confirmDelete = false">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="deleteSelected(selectedFolders)"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- FOLDER CARDS -->
    <v-row v-if="folders.length > 0">
      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="2"
        v-for="folder in folders"
        :key="folder.id"
      >
        <v-card
          :ripple="false"
          v-model="selectedFolders"
          @contextmenu="show($event, folder.id)"
          hover
          @click.prevent="redirectOnFolder(folder)"
          class="ma-0 pa-0"
        >
          <v-card-subtitle
            class="ma-0 pa-0 d-flex align-center justify-space-between"
          >
            <v-checkbox
              :ripple="false"
              hide-details
              class="ma-0 pa-3"
              @click.prevent.stop
              :value="folder.id"
              v-model="selectedFolders"
            ></v-checkbox>
            <v-checkbox
              hide-details
              @click.prevent.stop
              on-icon="mdi-star"
              off-icon="mdi-star"
              color="orange"
              v-model="fav"
              class="pa-0 ma-0 pr-1"
            ></v-checkbox>
          </v-card-subtitle>
          <v-container class="d-flex align-center justify-space-around"
            ><form
              class="d-flex align-center"
              v-if="renameForm.status && renameForm.folderId === folder.id"
            >
              <v-text-field
                hide-details="true"
                validate-on-blur
                v-model="folder.name"
                @click.prevent.stop
              ></v-text-field>
              <v-btn
                class="ml-1"
                icon
                submit
                @keydown.enter.prevent="renameFolder(folder.id, folder.name)"
                @click.prevent.stop="renameFolder(folder.id, folder.name)"
                ><v-icon color="success">mdi-check</v-icon></v-btn
              >
            </form>
            <div v-if="renameForm.folderId != folder.id" class="text-truncate">
              {{ folder.name }}
            </div>

            <v-icon
              v-if="renameForm.folderId != folder.id"
              class="ml-2"
              color="primary"
              x-large
              >folder</v-icon
            ></v-container
          >
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- RIGHT CLICK FOLDER MENU -->
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            @click="contextualAction(item.action)"
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-icon :color="item.color">
              <v-icon :color="item.color" v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ item.title }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>

    <!-- PLACEHOLDER -->
    <v-container v-if="folders.length <= 0 && !isLoading">
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

    <!-- PAGINATION -->
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
  data: () => ({
    selectedFolders: [],
    confirmDelete: false,
    showMenu: false,
    items: [
      { title: "Rename", icon: "mdi-pen", color: "primary", action: "rename" },
      { title: "Delete", icon: "mdi-delete", color: "red", action: "delete" },
      {
        title: "Add favorite",
        icon: "mdi-star",
        color: "orange",
        action: "fav",
      },
    ],
    x: 0,
    y: 0,
    clickedFolderId: null,
    fav: false,
    renameForm: {},
  }),
  methods: {
    ...mapActions("auth", ["fetchUser"]),
    ...mapActions("folder", [
      "getAllFolders",
      "deleteFolderById",
      "renameFolderById",
    ]),
    ...mapMutations("folder", ["selectedFolder"]),
    ...mapMutations("photo", ["resetPage"]),
    redirectOnFolder(folder) {
      this.selectedFolder(folder);
      router.push("/dashboard/folders/" + folder.id);
    },
    getPage(actualPage) {
      this.getAllFolders(actualPage);
    },
    getNbPages() {
      return Math.ceil(this.folderCount / 8);
    },
    deleteSelected(selectedFolders) {
      this.confirmDelete = false;
      for (let i = 0; i < selectedFolders.length; i++) {
        this.deleteFolderById(selectedFolders[i]);
      }
    },
    // Contextual menu
    show(e, folderId) {
      e.preventDefault();
      this.clickedFolderId = folderId;
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    // Right click actions on folder card
    contextualAction(action) {
      switch (action) {
        case "delete":
          this.deleteFolderById(this.clickedFolderId);
          break;
        case "rename":
          this.renameForm.status = true;
          this.renameForm.folderId = this.clickedFolderId;
          break;
        case "fav":
          console.log("clicked contextual action : ", action);
          break;
        default:
          break;
      }
    },
    renameFolder(folderId, newName) {
      this.renameFolderById({
        newName: newName,
        folderId: folderId,
        userId: this.loggedInUser.id,
      });
      this.renameForm = {};
    },
  },
  computed: {
    ...mapState("folder", ["folders", "folderCount"]),
    ...mapState("auth", ["loggedInUser"]),
    ...mapFields("folder", ["actualPage", "isLoading"]),
    selectAll: {
      get() {
        return this.selectedFolders.length === this.folders.length;
      },
      set(value) {
        this.selectedFolders = [];

        if (value) {
          this.folders.forEach((item) => {
            this.selectedFolders.push(item.id);
          });
        }
      },
    },
  },
  mounted() {
    document.title = "Dashboard | ICG";
    this.fetchUser();
    this.getAllFolders(this.actualPage);
    this.resetPage();
  },
};
</script>
