<template>
  <v-app class="d-flex justify-center align-center">
    <h1 class="text-center mt-12">Se connecter</h1>
    <div class="container pa-12">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="credentials.username"
          :rules="[rules.required]"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="credentials.mail"
          :rules="[rules.required, rules.format]"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="credentials.password"
          :rules="[rules.required]"
          label="Password"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
          Se connecter
        </v-btn>
      </v-form>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
//import swal from 'sweetalert2';
import router from "../router";
export default {
  data: () => {
    return {
      credentials: {},
      loading: false,
      valid: true,
      rules: {
        format: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'e-mail doit être valide.",
        required: (value) => !!value || "Requis.",
      },
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        axios
          .post("http://localhost:8085/auth/", this.credentials)
          .then((res) => {
            this.$session.start();
            this.$session.set("token", res.data.token);
            router.push("/profile");
          });
        //.catch(e => {
        //  this.loading = false;
        //  swal({
        //    type: "warning",
        //    title: "Error",
        //    text: "Wrong username or password",
        //    showConfirmButton: false,
        //    showCloseButton: false,
        //    timer: 3000,
        //  });
        //});
      }
    },
  },
};
</script>
