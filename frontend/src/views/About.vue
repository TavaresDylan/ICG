<template>
  <v-main>
    <v-container>
      <h1 class="mt-12 text-center">How this project was born ?</h1>
      <div class="mb-16" id="spacer"></div>
      <p class="text-center">
        This project was born in November 2021, as part of the certification of
        Artificial Intelligence Developer at the end of the work-study program
        of the Toulouse dev AI class of the Microsoft school by SIMPLON
      </p>
      <p class="text-center">That's why this project is open source, it's an exemple how to integrate an IA in a web site project. Project is maintenained <a href="https://github.com/TavaresDylan/ICG">here</a> and you can contribe by using and respect <a href="https://github.com/TavaresDylan/ICG/blob/master/CONTRIBUTING.md">this</a></p>
      <v-container>
        <v-row align="center">
          <v-col cols="6">
            <v-container class="d-flex flex-column align-center">
              <v-img
                contain
                max-width="50%"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png"
              ></v-img>
              <v-img
                max-width="40%"
                src="http://www.ma-sphere.eu/wp-content/uploads/2016/04/LOGO-SIMPLON.png"
              ></v-img>
            </v-container>
          </v-col>
          <v-col cols="6">
            <v-container class="d-flex justify-center">
              <v-card max-width="50%">
                <v-img
                  class="rounded"
                  contain
                  :src="require('../assets/dylan-resize2.jpeg')"
                  ><v-card-title light>Dylan Tavares</v-card-title></v-img
                >
                <v-card-text
                  >Student at Microsoft AI school by SIMPLON</v-card-text
                >
                <v-card-actions>
                  <v-col
                    class="d-flex justify-center"
                    v-for="social in socials"
                    :key="social.icon"
                  >
                    <v-btn icon :color="social.color">
                      <v-icon>{{ social.icon }}</v-icon>
                    </v-btn>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
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
#spacer {
  margin: auto;
  width: 12em;
  height: 0.2em;
  border-radius: 4px;
  margin-top: 1.2em;
  background-image: linear-gradient(
    to right,
    #bf2ecd 0%,
    #d4923b 50%,
    #b01f5e 100%
  );
}
</style>
