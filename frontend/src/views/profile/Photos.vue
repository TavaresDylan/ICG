<template>
  <v-container class="px-12">
    <v-row dense>
      <v-col :class="card.flexMd" v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-card>
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
    class="py-6"
      v-model="page"
      :length="4"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </v-container>
</template>

<script>
export default {
  name: "photos",
  data: () => ({
      page: 1,
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12, flexMd: "col-md-12" },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 12 , flexMd: "col-md-6" },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 12, flexMd: "col-md-6" },
        { title: 'Home sweet home', src: 'https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_960_720.jpg', flex: 12 , flexMd: "col-md-6" },
        { title: 'Love in the air', src: 'https://cdn.pixabay.com/photo/2017/07/31/21/04/people-2561053_960_720.jpg', flex: 12, flexMd: "col-md-6"  },
      ],
    }),
};
</script>
