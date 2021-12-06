<template>
  <v-app id="home">
    <div class="row ma-4">
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
              'Arya Stark',
              'Jon Snow',
              'Daenerys Targaryen',
              'Melisandre',
              'Tyrion Lannister',
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
      console.log("Vue typer complete ok");
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
#home {
  //background: rgb(88, 88, 243);
}
</style>
