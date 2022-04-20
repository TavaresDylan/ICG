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
        <v-card-title v-bind="folderName"> Create folder </v-card-title>
        <v-card-text>
          <v-text-field
            label="folder name"
            placeholder="Folder Name"
          ></v-text-field>
          <v-btn>OK</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      folderName: "",
      dialog: false,
    };
  },
  methods: {
    upload() {
      this.progress = 0;
      UploadService.upload(this.currentImage, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          return UploadService.getFiles();
        })
        .then((images) => {
          this.imageInfos = images.data;
        })
        .catch((err) => {
          this.progress = 0;
          this.message = "Could not upload the image! " + err;
          this.currentImage = undefined;
        });
    },
  },
  computed: {
    createFolder() {
      this.folderList = [this.folderName];
    },
  },
};
</script>
