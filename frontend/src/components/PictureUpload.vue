<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="1400px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-3" color="primary" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-file-image-plus-outline</v-icon>
          Add pictures
        </v-btn>
      </template>

      <v-card>
        <!-- MODAL TITLE -->
        <v-card-title>
          <span class="text-h5">Upload photos</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="form" lazy-validation>
                  <v-file-input
                    ref="files"
                    v-model="files"
                    :rules="rules"
                    @change="handleFilesUpload({ $event })"
                    color="primary"
                    counter
                    label="File input"
                    multiple
                    name="files"
                    placeholder="Select your files"
                    prepend-icon="mdi-folder-multiple-image"
                    outlined
                    :show-size="1000"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip v-if="index < 2" color="primary" dark label small>
                        {{ text }}
                      </v-chip>

                      <span
                        v-else-if="index === 2"
                        class="text-overline grey--text text--darken-3 mx-2"
                      >
                        +{{ files.length - 2 }} File(s)
                      </span>
                    </template>
                  </v-file-input>

                  <v-row>
                    <v-col
                      class="d-flex"
                      v-for="(file, key) in files"
                      :key="key"
                      cols="12"
                      sm="6"
                      md="3"
                      lg="3"
                    >
                      <!-- UPLOAD PREVIEW CARD -->
                      <v-card class="d-flex flex-column">
                        <div>
                          <v-btn
                            icon
                            x-small
                            color="error"
                            absolute
                            text
                            right
                            class="mt-2"
                            @click="removeFile(key)"
                            ><v-icon>mdi-close</v-icon></v-btn
                          >
                        </div>

                        <v-card-title>
                          <v-text-field v-model="fileNames[key]"></v-text-field>
                        </v-card-title>
                        <v-img contain :src="previewImage(file)"></v-img>
                        <v-card-text class="my-2 d-flex flex-column">
                          <v-row justify="center" align="center">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn icon>
                                  <v-icon
                                    color="primary"
                                    v-bind="attrs"
                                    v-on="on"
                                  >
                                    mdi-information
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span
                                >When you describe yourself your images we use
                                your descriptions to train AI model</span
                              >
                            </v-tooltip>
                            <v-checkbox
                              @change="handleCheckboxes({ $event, key })"
                              v-model="checkboxStatus[key]"
                              hide-details
                              label="Desactivate AI auto-description"
                              class="shrink mr-2 mt-0"
                            ></v-checkbox>
                            <v-text-field
                              :disabled="!checkboxStatus[key]"
                              v-model="descriptions[key]"
                              @change="handleDescription({ $event, key })"
                              label="Write your own description"
                            ></v-text-field>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
          <small>*only .jpg , .jpeg and .png are allowed</small>
        </v-card-text>

        <!-- FORM SUBMIT -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="resetForm()">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="onSubmit()"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    actualPage: Number,
  },
  data() {
    return {
      rules: [],
      files: [],
      dialog: false,
      checkboxStatus: [],
      descriptions: [],
      fileNames: [],
    };
  },
  computed: {
    ...mapState("user", ["username"]),
  },
  methods: {
    ...mapActions("upload", ["upload"]),
    handleFilesUpload(event) {
      let uploadedFiles = event;
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
      for (let j = 0; j < this.files.length; j++) {
        let name = this.files[j].name;
        let cleanName = name.indexOf(".");
        name = name.substring(0, cleanName != -1 ? cleanName : name.length);
        this.fileNames.push(name);
      }
    },
    handleDescription(event, key) {
      let description = event;
      this.descriptions[key] = description;
    },
    onSubmit() {
      const formData = new FormData();
      if (this.files === null) {
        formData.append("files", []);
      } else {
        for (let i = 0; i < this.files.length; i++) {
          formData.append("file", this.files[i]);
          formData.append("name", this.fileNames[i]);
          formData.append("image_url", URL.createObjectURL(this.files[i]));
          formData.append("size", this.files[i]["size"]);
          formData.append("description", this.descriptions[i]);
        }
      }
      this.upload(formData);
      this.resetForm();
    },
    previewImage(img) {
      return URL.createObjectURL(img);
    },
    resetForm() {
      this.files = null;
      this.dialog = false;
      this.descriptions = [];
      this.checkboxStatus = [];
      this.fileNames = [];
    },
    removeFile(key) {
      this.files.splice(key, 1);
    },
    handleCheckboxes(event, key) {
      let checkbox = event;
      this.checkboxStatus[key] = checkbox;
    },
  },
};
</script>
