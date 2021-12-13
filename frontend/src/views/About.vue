<template>
  <v-app class="container">
    <h1 class="text-center">This is an about page</h1>
    <p>Ce projet est pour la fin d'alternance de la promo Dev I.A 2021 Toulouse AI by Microsoft</p>
    <p class="display-1 text-center">Quel but à but à ce projet ?</p>
    <p>Ce projet est fait pour facilité le tri des photos des utlisateurs et de leur offir un espadce de stockage cloud assité par IA afin d'automatiquement généré une description de chaqunes de leurs photos afin de les retrouver plus facilement dans leur espace de stockage.</p>
    <v-img src="https://cdn.pixabay.com/photo/2013/07/12/12/34/slide-145953_1280.png" max-width="346"></v-img>
    <p class="display-1 text-center">Quelles technolgies sont utilisés pour généré les descriptions des photos ?</p>
    <p>Les réseaux neuronnals convolutifs</p>
    <p>Cet algorithme de machine learning profond permet de traiter votre image en 2 dimensions. L'algorithme scan de dans le sens de la lecture de votre image</p>
    <p class="display-1 text-center">Quel est le dataset d'entrainement de L'IA ?</p>
    <p>Le datadet d'entrainement de cette IA est <a href="https://github.com/jbrownlee/Datasets/releases/download/Flickr8k/Flickr8k_Dataset.zip">Flickr8k</a></p>
  </v-app>
</template>


<script>
export default {
  name: "About",
}
</script>