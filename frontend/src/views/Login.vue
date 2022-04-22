<template>
  <v-main>
    <h1 class="text-center mt-12">
      <v-icon color="black">mdi-login</v-icon> Log In
    </h1>
    <v-container class="pa-12">
      <v-alert
        :value="errorLoginStatus"
        dense
        border="left"
        type="error"
        dismissible
        transition="scroll-y-reverse-transition"
        >{{ errorLoginMsg }}</v-alert
      >
      <v-row justify="center">
        <v-col cols="12" class="col-sm-8 col-md-6 col-lg-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              @focus="handleError()"
              v-model="creds.username"
              :rules="[rules.required]"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              @keydown.enter.prevent="login"
              @click:append="show1 = !show1"
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
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data: () => {
    return {
      username: "",
      password: "",
      creds: {
        name: "",
        password: "",
      },
      show1: false,
      loading: false,
      valid: true,
      rules: {
        required: (value) => !!value || "Requis.",
      },
    };
  },
  computed: {
    ...mapState("auth", ["errorLoginMsg", "errorLoginStatus"]),
  },
  methods: {
    ...mapActions("auth", ["logUser"]),
    ...mapMutations("auth", ["resetError"]),
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.logUser(this.creds);
      }
    },
    handleError() {
      this.resetError();
    },
  },
};
</script>
