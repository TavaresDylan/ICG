<template>
  <v-form @submit.prevent class="d-flex align-center justify-center">
    <v-text-field
      :placeholder="searchLabel"
      v-model="search"
      append-icon="mdi-magnify"
    >
    </v-text-field>
  </v-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    items: Array,
    searchLabel: String,
    page: Number,
  },
  data: () => ({
    isLoading: false,
    model: null,
    search: null,
  }),
  computed: {
    ...mapState("folder", ["selectedFolder"]),
    ...mapState("auth", ["loggedInUser"]),
  },
  watch: {
    search(i) {
      if (this.$router.currentRoute.name === "FoldersDetails") {
        if (i === "") {
          setTimeout(
            () =>
              this.getByPage({
                page: this.page,
                folder_id: this.selectedFolder.id,
              }),
            500
          );
        } else {
          this.getByName({
            name: this.search,
            folder_id: this.selectedFolder.id,
          });
        }
      } else if (this.$router.currentRoute.name === "Photos") {
        if (i === "") {
          setTimeout(() => this.getAllFolders(this.page), 500);
        } else {
          this.getFolderByName({
            name: this.search,
            folder_id: this.selectedFolder.id,
            user_id: this.loggedInUser.id,
          });
        }
      }
    },
  },
  methods: {
    ...mapActions("photo", ["getByName", "getAll", "getByPage"]),
    ...mapActions("folder", ["getAllFolders", "getFolderByName"]),
  },
};
</script>
