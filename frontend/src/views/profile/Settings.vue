<template>
  <v-app class="container">
    <h1>Profile settings</h1>

    <h2>Account</h2>
    <v-container>
      <v-row>
        <v-col>
          <label for="">Change username</label>
          <v-form>
            <v-text-field label="Change username" required></v-text-field>
            <v-btn color="success">Change username</v-btn>
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
        <v-btn class="my-12" block color="red" dark>Delete account</v-btn>
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
export default {
  name: "settings",
};
</script>
