<template>
  <v-app id="home">
    <div class="row ma-16">
      <div
        class="col-md-6 col-xs-12 d-flex flex-column align-center justify-center"
      >
        <h1 class="display-3 pb-12">Votre trieur de photo en ligne</h1>
        <h2 class="display-1 pt-12">
          Outil automatique de génération de description photographique
        </h2>
      </div>
      <div
        class="col-md-6 col-xs-12 d-flex flex-column align-center justify-center"
      >
        <v-carousel
          hide-delimiters
          :cycle="false"
          ref="carousel"
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(image, i) in images"
            :key="i"
            :src="image.src"
          ></v-carousel-item>
        </v-carousel>
        <div>
          <vue-typer
            :text="[
              'Squirrel eating gland',
              'Cloudy sky with sunset',
              'Eagle',
              'Melisandre',
              'Planets in space',
            ]"
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
            @erased="onComplete"
          ></vue-typer>
        </div>
      </div>
    </div>

    <div class="d-flex justify-center align-center flex-column">
      <h2 class="display-2">Fonctionnalités</h2>
      <div id="spacer"></div>
      <div class="row">
        <div class="col-6 d-flex justify-center align-center flex-column pa-6">
          <p class="display-1">Retrouvez vos photos simplement</p>
          <p>
            Vos photos sur le cloud sont automatiquement décrite par IA,
            retrouvez vos souvenirs en faisant une recherche par description.
          </p>
        </div>
        <div class="col-6 d-flex align-center justify-center">
          <v-img
            max-width="23em"
            src="https://cdn.pixabay.com/photo/2016/03/31/19/16/images-1294872_1280.png"
          ></v-img>
        </div>
      </div>
      <div class="row">
        <div class="col-6 d-flex align-center justify-center">
          <v-img
            max-width="23em"
            src="https://cdn.pixabay.com/photo/2016/03/31/19/16/images-1294872_1280.png"
          ></v-img>
        </div>
        <div class="col-6 d-flex justify-center align-center flex-column pa-6">
          <p class="display-1">Stockez toute vos photos sur le cloud</p>
          <p>
            Un espace de stockage illimité pour sécurisé vos souvenir les plus
            précieux.
          </p>
        </div>
      </div>
    </div>

    <div class="d-flex justify-center align-center flex-column">
      <h2 class="display-2">Tarifs</h2>
      <div id="spacer"></div>
      <v-row class="pa-12">
        <v-col cols="12" class="col-md-4">
          <v-card>
            <v-card-title class="text-h5"> Silver pack <v-icon color="grey">mdi-currency-usd-off</v-icon></v-card-title>

            <v-card-subtitle
              >Profitez de notre offre de découverte.</v-card-subtitle
            >

            <v-card-text>
              <v-list>
                <p>✔️ Profitez de l'hebergement jusqu'a 220 photos</p>
                <p>✔️</p>
              </v-list>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" text> Commencer </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" class="col-md-4">
          <v-card>
            <v-card-title class="text-h5"> Gold pack <v-icon color="orange">mdi-gold</v-icon></v-card-title>

            <v-card-subtitle
              >Profitez de notre offre de découverte.</v-card-subtitle
            >

            <v-card-text>
              <v-list>
                <p>✔️ Profitez de l'hebergement jusqu'a 220 photos</p>
                <p>✔️</p>
              </v-list>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" text> Commencer </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" class="col-md-4">
          <v-card>
            <v-card-title class="text-h5"> Diamond pack <v-icon color="blue">mdi-diamond-stone</v-icon></v-card-title>

            <v-card-subtitle
              >Profitez de notre offre de complète et soutenez le projet.</v-card-subtitle
            >

            <v-card-text>
              <v-list>
                <p>✔️ Hebergement de photos illimité</p>
                <p>✔️ Accès à l'IA prioritaire</p>
                <p>✔️ Contribuez à l'amélioration des descriptions de l'IA</p>
              </v-list>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" text> Souscrire </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import { VueTyper } from "vue-typer";
export default {
  name: "Home",
  components: {
    VueTyper,
  },
  methods: {
    onComplete: function () {
      this.$refs.carousel.next();
    },
  },
  data() {
    return {
      images: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#spacer {
  width: 12em;
  height: 0.2em;
  border: 2px solid black;
  border-radius: 4px;
  background: black;
  margin-top: 1.2em;
}
</style>
