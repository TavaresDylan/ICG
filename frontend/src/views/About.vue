<template>
  <v-main>
    <h1 class="text-center">About us</h1>
    <div class="d-flex align-self-center mb-12" id="spacer"></div>
    <h2 class="text-center">How this project was born ?</h2>
    <p class="text-center">
      This project was born in November 2021, as part of the certification of
      Artificial Intelligence Developer at the end of the work-study program of
      the Toulouse dev AI class of the Microsoft school by SIMPLON
    </p>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png"
          ></v-img>
        </v-col>
        <v-col cols="6">
          <v-img
            width="50%"
            src="http://www.ma-sphere.eu/wp-content/uploads/2016/04/LOGO-SIMPLON.png"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <h2 class="text-center">Who works on it ?</h2>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img
            width="80%"
            class="rounded"
            contain
            :src="require('../assets/dylan-resize2.jpeg')"
          ></v-img>
        </v-col>
        <v-col cols="6">
          <p>Dylan Tavares</p>
          <p>You can check out my social medias</p>
          <div>
            <v-card flat>
              <v-card-text>
                <v-container fluid class="pa-0">
                  <v-row>
                    <v-col
                      cols="12"
                      sm="3"
                      v-for="social in socials"
                      :key="social.icon"
                    >
                      <v-btn icon :color="social.color">
                        <v-icon>{{ social.icon }}</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <h2 class="text-center">What kind of services does ICG offer ?</h2>
    <p>
      ICG allows you to store your photos in a secure way, and to facilitate the
      research of these with the automatic generation of descriptions, as well
      as the analysis of the metadata in order to group your pictures
      intelligently.
    </p>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-img
            width="70%"
            src="https://cdn.pixabay.com/photo/2013/07/13/10/52/file-157955_960_720.png"
          ></v-img>
        </v-col>
        <v-col cols="4">
          <v-img
            width="70%"
            src="https://cdn.pixabay.com/photo/2015/12/08/19/08/castle-1083570_960_720.png"
          ></v-img>
        </v-col>
        <v-col cols="4"
          ><v-img
            width="70%"
            src="https://cdn.pixabay.com/photo/2013/07/12/12/34/slide-145953_1280.png"
          ></v-img
        ></v-col>
      </v-row>
    </v-container>

    <h2 class="text-center">
      Quelles technolgies sont utilisés pour généré les descriptions des photos
      ?
    </h2>
    <p>Les réseaux neuronnals convolutifs</p>
    <p>
      Cet algorithme de machine learning profond permet de traiter votre image
      en 2 dimensions. L'algorithme scan de dans le sens de la lecture de votre
      image
    </p>
    <h2 class="text-center">Quel est le dataset d'entrainement de L'IA ?</h2>
    <p>
      Le datadet d'entrainement de cette IA est
      <a
        href="https://github.com/jbrownlee/Datasets/releases/download/Flickr8k/Flickr8k_Dataset.zip"
        >Flickr8k</a
      >
    </p>
  </v-main>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      socials: [
        { icon: "mdi-linkedin", color: "blue" },
        { icon: "mdi-web", color: "blue" },
        { icon: "mdi-gitlab", color: "orange" },
        { icon: "mdi-github", color: "black" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  padding: 20px;
}
</style>
