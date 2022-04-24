<template>
  <v-main class="d-flex align-center">
    <h1 class="text-center mt-12">
      <v-icon color="black">mdi-login</v-icon> Log In
    </h1>
    <v-container class="pa-12">
      <v-row justify="center">
        <v-col cols="12" class="col-sm-8 col-md-6 col-lg-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              @focus="resetAlert()"
              v-model="creds.username"
              :rules="[rules.required]"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              @keydown.enter.prevent="login"
              @click:append="show1 = !show1"
              @focus="resetAlert()"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              v-model="creds.password"
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
  </v-main>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data: () => {
    return {
      creds: {
        name: "",
        password: "",
      },
      show1: false,
      valid: false,
      rules: {
        required: (value) => !!value || "Requis.",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["logUser"]),
    ...mapMutations(["resetAlert"]),
    login() {
      if (this.$refs.form.validate()) {
        this.logUser(this.creds);
      }
    },
  },
};
</script>
