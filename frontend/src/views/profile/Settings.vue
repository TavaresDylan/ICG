<template>
  <v-container>
    <h2 class="pl-4">Personnal informations</h2>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="col-sm-6 col-md-4">
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
              v-model="lastname"
              name="lastname"
              label="Lastname"
              required
            ></v-text-field>
          </v-form>
          <v-btn color="success">Confirm</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <hr class="ma-6" />

    <h2 class="pl-4">Account</h2>
    <v-container class="px-6">
      <v-row justify="center">
        <v-col cols="12" class="col-sm-6 col-md-4">
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

      <v-row justify="center">
        <v-col cols="12" class="col-sm-6 col-md-4">
          <label for="">Change password</label>
          <v-form>
            <v-text-field label="Old password" required></v-text-field>
            <v-text-field label="New password" required></v-text-field>
            <v-text-field label="Confirm new password" required></v-text-field>
            <v-btn color="success">Change password</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" class="col-sm-6 col-md-4">
          <label for="">Change email</label>
          <v-form>
            <v-text-field label="New e-mail" required></v-text-field>
            <v-text-field label="Confirm new e-mail" required></v-text-field>
            <v-btn color="success">Change email</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col align="center" cols="12" class="col-sm-6 col-md-4">
          <v-btn class="my-12" color="red" dark v-model="checked" @click="check"
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
                >Confirm</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <hr class="ma-6" />

    <v-container>
      <h2 class="pl-4">Profile</h2>
      <v-row justify="center">
        <v-col cols="12" class="col-sm-6 col-md-4">
          <v-form class="pb-16">
            <label for="">Change your avatar</label>
            <v-file-input></v-file-input>
            <v-btn color="primary">Change avatar</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
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
      firstname: "Jhon",
      lastname: "Doe",
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
