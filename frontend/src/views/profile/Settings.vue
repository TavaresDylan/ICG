<template>
  <v-app class="container">
    <h1>Profile settings</h1>

    <h2>Personnal informations</h2>
    <v-container>
      <v-row>
        <v-form>
          <v-text-field
              v-model="firstname"
              name="firstname"
              label="Firstname"
              required
            ></v-text-field>
        </v-form>
        <v-form>
          <v-text-field
              v-model="Lastname"
              name="lastname"
              label="Lastname"
              required
            ></v-text-field>
        </v-form>
      </v-row>
    </v-container>

    <h2>Account</h2>
    <v-container>
      <v-row>
        <v-col>
          <label for="">Change username</label>
          <v-form ref="form1">
            <v-text-field
              v-model="new_username"
              name="newusername"
              label="New username"
              required
            ></v-text-field>
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="current_password"
              v-model="current_password"
              label="Enter your password"
              required
              counter
              @click:append="show = !show"
            ></v-text-field>
            <v-btn @click="newUsernameAction" color="success"
              >Change username</v-btn
            >
          </v-form>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <label for="">Change password</label>
          <v-form>
            <v-text-field label="Old password" required></v-text-field>
            <v-text-field label="New password" required></v-text-field>
            <v-text-field label="Confirm new password" required></v-text-field>
            <v-btn color="success">Change password</v-btn>
          </v-form>
        </v-col>

        <v-col>
          <label for="">Change email</label>
          <v-form>
            <v-text-field label="New e-mail" required></v-text-field>
            <v-text-field label="Confirm new e-mail" required></v-text-field>
            <v-btn color="success">Change email</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <v-row>
        <v-btn
          class="my-12"
          block
          color="red"
          dark
          v-model="checked"
          @click="check"
          >Delete account</v-btn
        >
        <v-card flat v-if="checked">
          <v-form ref="form" lazy-validation>
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="current_password"
              v-model="current_password"
              label="Enter your password"
              required
              counter
              @click:append="show = !show"
            ></v-text-field>
            <v-btn color="error" @click="deleteAccount"
              >Confirm (permanently delete your account)</v-btn
            >
          </v-form>
        </v-card>
      </v-row>
    </v-container>
    <h2>Profile</h2>
    <v-form>
      <label for="">Change your avatar</label>
      <v-file-input></v-file-input>
      <v-btn color="primary">Change avatar</v-btn>
    </v-form>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "settings",
  data() {
    return {
      checked: false,
      show: false,
      newUsername: "",
    };
  },
  computed: {
    ...mapFields(["user.current_password", "user.new_username"]),
  },
  methods: {
    ...mapActions("user", ["deleteUser", "changeUsername"]),
    deleteAccount() {
      this.deleteUser();
      this.$store.commit({
        type: "auth/removeToken",
      });
      localStorage.removeItem("Token");
    },
    newUsernameAction() {
      this.changeUsername();
    },
    check() {
      if (this.checked === false) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
};
</script>
