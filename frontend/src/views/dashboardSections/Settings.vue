<template>
  <v-container>
    <div class="d-flex justify-center ma-12">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-avatar class="avatar-no-img-bg" size="120">
            <img
              v-if="profileImgPath != ''"
              style="cursor: pointer"
              :src="'http://localhost:8085' + profileImgPath"
              alt="Profile picture"
            />
            <span class="white--text text-h4" v-else>{{ initials }}</span>
            <v-fade-transition>
              <v-overlay v-show="hover" absolute color="#d54660">
                <v-file-input
                  class="ma-0 pa-0 pl-2"
                  ref="profilePicture"
                  v-model="profilePicture"
                  @change="changeProfileImg()"
                  prepend-icon="mdi-pen"
                  hide-details
                  hide-input
                  hide-spin-buttons
                ></v-file-input>
              </v-overlay>
            </v-fade-transition>
          </v-avatar>
        </template>
      </v-hover>
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
      profilePicture: {},
    };
  },
  computed: {
    ...mapFields(["user.current_password", "user.new_username"]),
    ...mapState("auth", ["loggedInUser"]),
    ...mapState("user", ["profileImgPath"]),
    initials() {
      if (
        this.loggedInUser.first_name === "" ||
        this.loggedInUser.last_name === ""
      ) {
        return this.loggedInUser.username.substring(0, 2).toUpperCase();
      }
      var fullname =
        this.loggedInUser.first_name + " " + this.loggedInUser.last_name;
      var names = fullname.split(" ");
      var initials = names[0].substring(0, 1).toUpperCase();
      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return initials;
    },
  },
  methods: {
    ...mapActions("user", [
      "deleteUser",
      "changeUsername",
      "getUserProfileImg",
      "uploadUserProfileImg",
    ]),
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
      const formData = new FormData();
      formData.append("file", this.profilePicture);
      this.uploadUserProfileImg(formData);
    },
    check() {
      if (this.checked === false) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  mounted() {
    this.getUserProfileImg();
  },
};
</script>

<style lang="scss" scoped>
.avatar-no-img-bg {
  background: linear-gradient(
    95deg,
    rgba(251, 84, 111, 1) 0%,
    rgba(221, 21, 107, 1) 54%,
    rgba(207, 44, 125, 1) 100%
  ) !important;
}
</style>
