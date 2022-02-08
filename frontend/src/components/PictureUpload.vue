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
        <v-card-title>
          <span class="text-h5">Upload photos</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="image"
                  :rules="rules"
                  @change="previewImage"
                  color="primary"
                  counter
                  label="File input"
                  multiple
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
                      +{{ image.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>

                <v-row>
                  <v-col
                    v-for="imgUrlData in imgUrls"
                    :key="imgUrlData.src"
                    cols="3"
                  >
                    <v-card>
                      <v-card-title
                        ><v-text-field :value="imgUrlData.name"></v-text-field
                      ></v-card-title>
                      <v-img :src="imgUrlData.src"></v-img>
                      <v-card-text class="my-2">
                        <v-row align="center">
                          <v-checkbox
                            v-model="enabled"
                            hide-details
                            class="shrink mr-2 mt-0"
                          ></v-checkbox>
                          <v-text-field
                            :disabled="!enabled"
                            label="Write your own description"
                          ></v-text-field>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {},
      image: null,
      imgUrls: [],
      dialog: false,
      enabled: false,
    };
  },
  methods: {
    previewImage() {
      this.image.forEach((element) => {
        this.imgUrls.push({
          src: URL.createObjectURL(element),
          name: element.name,
        });
      });
    },
    cancelUpload(){
      // Write how to reset images data on form
    }
  },
};
</script>
