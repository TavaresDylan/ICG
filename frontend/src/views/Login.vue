<template>
  <v-app class="d-flex justify-center align-center">
    <h1 class="text-center mt-12">Se connecter</h1>
    <div class="container pa-12">
      <v-form ref="form" v-model="valid" lazy-validation>

      <v-text-field
        v-model="email"
        :rules="[rules.required, rules.format]"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="[rules.required]"
        label="Password"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Se connecter
      </v-btn>
    </v-form>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      valid: true,
      rules: {
        format: (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'L\'e-mail doit être valide.',
        required: (value) => !!value || "Requis.",
      }
    }
  },
  methods: {
    validate() {
      axios.get('http://localhost:8085/api/user')
      .then(response => (this.info = response))
      console.log("validate")
    },
  },
}
</script>
