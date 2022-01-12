<template>
  <v-main>
    <div class="d-flex align-self-center mb-12" id="spacer"></div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          class="col-md-6 d-flex flex-column justify-space-around"
        >
          <div class="d-flex flex-column align-center">
            <p class="px-lg-16">
              As a non-registered user, during the pre-alpha period of the
              project you have the possibility to try the main functionality of
              the application, you can also <b>register for free</b> to benefit
              from more advanced features.
            </p>
            <v-btn color="secondary" to="/signup">Register now</v-btn>
          </div>
          <v-card class="pa-6 ma-4">
            <h1>Upload your file</h1>
            <p>Esssayer notre I.A de description en envoyant une photo.</p>
            <v-file-input
              :rules="rules"
              label="Envoyez votre image"
              outlined
              dense
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an image"
            ></v-file-input>
            <v-btn color="primary">Envoyer</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" class="col-md-6 align-self-center">
          <v-img
            src="https://cdn.pixabay.com/photo/2016/11/14/03/48/father-1822528_1280.jpg"
          ></v-img>
          <v-col class="pt-3 px-6">
            <vue-typer
              :text="['Man with child in field']"
              :repeat="Infinity"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="70"
              :type-delay="200"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="select-all"
              :erase-on-complete="false"
              caret-animation="blink"
            ></vue-typer>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { VueTyper } from "vue-typer";
export default {
  name: "Upload",
  components: {
    VueTyper,
  },
  data: () => {
    return {
      rules: [
        (value) =>
          !value ||
          value.size < 13000000 ||
          "Le fichier ne doit pas exéder 13mo",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .vue-typer {
  .custom.char {
    color: black;
    font-weight: bold;
    font-size: 1.2em;
  }
}
</style>
