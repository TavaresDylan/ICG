<template>
  <v-autocomplete
    @change="getBySearch"
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    chips
    clearable
    hide-details
    hide-selected
    item-text="name"
    item-value="symbol"
    :label="searchLabel"
    solo
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Search by image name or by
          <strong>description</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-avatar
        color="indigo"
        class="text-h5 font-weight-light white--text"
      >
        {{ item.name.charAt(0) }}
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
        <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    items: Array,
    searchLabel: String,
  },
  data: () => ({
    isLoading: false,
    model: null,
    search: null,
  }),
  computed: {
    ...mapState("photo", ["page"]),
  },
  methods: {
    ...mapActions("photo", ["getByName", "getAll", "getByPage"]),
    getBySearch() {
      if (this.model === null) {
        this.getByPage(this.page);
      } else {
        this.getByName(this.model);
      }
    },
  },
};
</script>
