<template>
    <v-container>
      <v-row>
        <v-col cols="12" class="col-md-6">
          <v-card>
            <v-card-title>
              <v-avatar color="orange" size="62">
                <span class="white--text text-h5">62</span>
              </v-avatar>
              <h3 class="ml-4">{{ username | capitalize }}</h3>
            </v-card-title>
            <v-card-text class="text-h12 font-weight-bold">
              <p>
                ICG member since
                {{ date_joined | moment("dddd, MMMM Do YYYY") }}
              </p>
              <p>Status : {{ userStatus.statusName }} {{ userStatus.icon }}</p>
              <p>Tu as un total de {{ nbPictures }} photos</p>
              <p>{{ email }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" class="col-md-6">
          <v-card>
            <v-card-title>
              <v-icon color="green">mdi-plus-circle</v-icon>
              <h3 class="ml-4">Add photos</h3>
            </v-card-title>
              <v-card-text class="text-h12 font-weight-bold">
                <v-btn><v-icon>mdi-plus-circle</v-icon> Add photos</v-btn>
              </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "dashboard",
  data: () => {
    return {
      nbPictures: 423,
      userStatus: { statusName: "Diamond", icon: "💎" },
    };
  },
  methods: {
    ...mapActions("user", ["getUser"]),
  },
  computed: {
    ...mapState("user", ["username", "email", "date_joined"]),
  },
  mounted() {
    this.getUser();
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
