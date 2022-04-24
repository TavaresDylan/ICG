<template>
  <v-main class="d-flex align-center">
    <h1 class="text-center mt-12">
      <v-icon color="black">mdi-account-plus</v-icon> Sign Up
    </h1>
    <v-container class="pa-12">
      <v-alert v-if="success_msg != ''" type="success" dismissible>{{
        success_msg
      }}</v-alert>
      <v-row justify="center">
        <v-col cols="12" class="col-sm-8 col-md-6 col-lg-4">
          <v-form ref="form">
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
              :rules="[rules.required, passwordMatch]"
              :type="show2 ? 'text' : 'password'"
              name="confirmPassword"
              label="Confirm password"
              counter
              required
              @click:append="show2 = !show2"
            ></v-text-field>

            <p><a href="">Terms of use</a></p>

            <v-checkbox
              v-model="form.checkbox"
              :rules="[(v) => !!v || 'You must agree to continue.']"
              label="Do you accept terms of use ?"
              required
            ></v-checkbox>

            <v-btn color="success" class="mr-4" @click="validate">
              Sign Up
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
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
        minName: (v) => v.length >= 3 || "Must contain at least 3 characters",
        format: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid.",
        minPassword: (v) =>
          (v.length >= 8 && /[^A-Za-z0-9]/.test(v)) ||
          "Must contain at least 8 characters and one special character.",
        required: (value) => !!value || "required.",
      },
    };
  },
  computed: {
    passwordMatch() {
      return () =>
        this.form.password === this.form.confirmPassword ||
        "Password must match";
    },
  },
  methods: {
    validate() {
      if (this.$refs.form.validate() === true) {
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
          })
          .finally(function () {
            this.$refs.form.reset();
          });
      } else {
        console.log("Form is not valid");
      }
    },
  },
};
</script>
