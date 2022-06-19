<template>
  <v-container>
    <div class="d-flex justify-center ma-12">
      <v-badge
        @click="changeProfileImg()"
        style="cursor: pointer"
        icon="mdi-pen"
        bordered
        bottom
        color="primary"
        offset-x="25"
        offset-y="25"
      >
        <v-avatar size="120">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="Profile picture"
          />
        </v-avatar>
      </v-badge>
    </div>

    <v-row justify="center" class="text-center d-flex align-center ma-4">
      <v-col cols="12" class="col-lg-4 col-md-6 col-sm-8">
        Status :
        <v-icon v-if="loggedInUser.is_superuser" color="orange"
          >mdi-crown</v-icon
        >
        <v-btn text color="rgb(231, 68, 116)" elevation="1" class="ml-4" small rounded
          ><v-icon>mdi-arrow-up</v-icon> Upgrade</v-btn
        >
      </v-col>
      <v-col cols="12" class="col-lg-4 col-md-6 col-sm-8"
        >space avalable :
        <v-progress-linear rounded class="white--text" reverse buffer-value="100" v-model="totalPhotos" height="25">
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }} Photos</strong>
          </template>
        </v-progress-linear></v-col
      >
    </v-row>

    <v-row justify="center">
      <v-col cols="10" class="col-lg-4 col-md-6 col-sm-8">
        <v-form class="d-flex justify-space-around">
          <v-text-field
            class="mx-2"
            outlined
            v-model="loggedInUser.first_name"
            name="firstname"
            label="Firstname"
            required
          ></v-text-field>
          <v-text-field
            class="mx-2"
            outlined
            v-model="loggedInUser.last_name"
            name="lastname"
            label="Lastname"
            required
          ></v-text-field>
          <!--<v-btn color="success">Confirm</v-btn>-->
        </v-form>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="col-sm-6 col-md-4">
        <v-form ref="form1">
          <v-text-field
            outlined
            v-model="loggedInUser.username"
            name="newusername"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            outlined
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
        <v-form>
          <v-text-field outlined label="Old password" required></v-text-field>
          <v-text-field outlined label="New password" required></v-text-field>
          <v-text-field
            outlined
            label="Confirm new password"
            required
          ></v-text-field>
          <v-btn color="success">Change password</v-btn>
        </v-form>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="col-sm-6 col-md-4">
        <v-form>
          <v-text-field
            outlined
            v-model="loggedInUser.email"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            outlined
            label="Confirm new e-mail"
            required
          ></v-text-field>
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
              outlined
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="current_password"
              v-model="current_password"
              label="Enter your password"
              required
              counter
              @click:append="show = !show"
            ></v-text-field>
            <v-btn color="error" @click="deleteAccount">Confirm</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "settings",
  data() {
    return {
      checked: false,
      show: false,
      newUsername: "",
      overlay: false,
      totalPhotos: 222,
    };
  },
  computed: {
    ...mapFields(["user.current_password", "user.new_username"]),
    ...mapState("auth", ["loggedInUser"]),
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
    changeProfileImg() {
      console.log("change profile image");
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
