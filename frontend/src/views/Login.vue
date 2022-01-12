<template>
  <v-content class="d-flex justify-center align-center">
    <h1 class="text-center mt-12">Log In</h1>
    <v-container class="pa-12">
      <v-alert
        :value="errorLoginStatus"
        dense
        border="left"
        v-if="errorLoginMsg != ''"
        type="error"
        dismissible
        transition="scroll-y-reverse-transition"
        >{{ errorLoginMsg }}</v-alert
      >
      <v-row justify="center">
        <v-col cols="12" class="col-sm-8 col-md-6 col-lg-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="credentials.username"
              :rules="[rules.required]"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              @keydown.enter.prevent="login"
              @click:append="show1 = !show1"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              v-model="credentials.password"
              :rules="[rules.required]"
              label="Password"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mt-4"
              @click="login"
            >
              Log In
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  data: () => {
    return {
      show1: false,
      loading: false,
      valid: true,
      rules: {
        required: (value) => !!value || "Requis.",
      },
    };
  },
  computed: {
    ...mapFields(["auth.credentials"]),
    ...mapState("auth", ["errorLoginMsg", "errorLoginStatus"]),
  },
  methods: {
    ...mapActions("auth", ["logUser"]),
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.logUser();
      }
    },
  },
};
</script>
