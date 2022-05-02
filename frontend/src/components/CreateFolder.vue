<template>
  <div>
    <v-dialog v-model="dialog" max-width="330px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-3" color="primary" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-folder-plus-outline</v-icon>
          Create folder
        </v-btn>
      </template>
      <v-card>
        <v-card-title> Create folder </v-card-title>
        <v-form lazy-validation>
          <v-card-text>
            <v-text-field
              @keydown.enter.prevent="submit"
              :rules="[rules.minName]"
              label="folder name"
              placeholder="Folder Name"
              v-model="folderName"
            ></v-text-field>
            <v-btn @click="submit()">OK</v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    actualPage: Number,
  },
  data() {
    return {
      folderName: "",
      dialog: false,
      rules: {
        minName: (v) => v.length >= 1 || "Must contain at least 1 characters",
      },
    };
  },
  computed: {
    userId() {
      return this.getUserId();
    },
  },
  methods: {
    ...mapActions("folder", ["createFolder"]),
    ...mapGetters("auth", ["getUserId"]),
    resetForm() {
      this.folderName = "";
      this.dialog = false;
    },
    submit() {
      this.createFolder(
        { name: this.folderName, user_id: this.userId },
        this.actualPage
      );
      this.dialog = false;
      this.resetForm();
    },
  },
};
</script>
