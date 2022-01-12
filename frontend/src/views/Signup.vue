<template>
  <v-content class="d-flex justify-center align-center">
    <h1 class="text-center mt-12">
      <v-icon color="black">mdi-account-plus</v-icon> Sign Up
    </h1>
    <v-container class="pa-12">
      <v-alert v-if="success_msg != ''" type="success" dismissible>{{
        success_msg
      }}</v-alert>
      <v-row justify="center">
        <v-col cols="12" class="col-sm-8 col-md-6 col-lg-4">
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="form.username"
              :counter="10"
              :rules="[rules.required, rules.minName]"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.email"
              :rules="[rules.required, rules.format]"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.minPassword]"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Password"
              counter
              ref="password"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
              v-model="form.confirmPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.minPassword]"
              :type="show2 ? 'text' : 'password'"
              name="confirmPassword"
              label="Confirm password"
              counter
              required
              @click:append="show2 = !show2"
            ></v-text-field>

            <p><a href="">Conditions d'utilisation</a></p>

            <v-checkbox
              v-model="form.checkbox"
              :rules="[
                (v) => !!v || 'Vous devez accepter pour pouvoir continuer.',
              ]"
              label="Acceptez-vous les conditions d'utilisation ?"
              required
            ></v-checkbox>

            <v-btn color="success" class="mr-4" @click="validate">
              Sign Up
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      show1: false,
      show2: false,
      success_msg: "",
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        checkbox: false,
      },
      rules: {
        minName: (v) => v.length >= 3 || "Doit contenir au moins 3 caratères.",
        format: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'e-mail doit être valide.",
        emailMatch: () => `The email and password you entered don't match`,
        //passwordMatch: (v) => v == this.form.password || `La confirmation du mot de passe ne correspond pas à votre mot de passe`,
        minPassword: (v) =>
          v.length >= 8 ||
          "Doit contenir au moins 8 caratères incluant au moins un caractère spécial.",
        required: (value) => !!value || "required.",
      },
    };
  },
  methods: {
    validate() {
      axios
        .post("/api/v1/register/", this.form)
        .then((res) => {
          if (res.status === 201) {
            this.success_msg = "Registration complete you can now login";
            this.$refs.form.reset();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
