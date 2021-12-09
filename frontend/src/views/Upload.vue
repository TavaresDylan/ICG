<template>
  <v-app>
    <div class="row d-flex">
      <div class="col-6 d-flex align-center justify-center">
        <v-card class="col-6 d-flex flex-column text-center">
          <h1>Upload your file</h1>
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
      </div>
      <div class="col-6 d-flex align-center justify-center flex-column">
        <v-img
          src="https://cdn.pixabay.com/photo/2016/11/14/03/48/father-1822528_1280.jpg"
        ></v-img>
        <p>Exemple description d'image</p>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Upload",
  data: () => {
    return {
      rules: [
          (value) =>
            !value || value.size < 13000000 || "Le fichier ne doit pas exéder 13mo",
        ],
    }
  }
};
</script>

<style lang="scss">

</style>