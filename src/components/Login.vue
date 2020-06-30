<template>
  <div>
    <Navigation />
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel grey lighten-4 black-text center">
            <h1>Login</h1>
            <form action="index.html">
              <div class="input-field">
                <input type="email" id="email" v-model="email" />
                <label for="email">Email Address</label>
              </div>
              <div class="input-field">
                <input type="password" id="password" v-model="password" />
                <label for="password">Password</label>
              </div>
              <button
                v-on:click="login"
                class="btn btn-large btn-extended grey lighten-4 black-text"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <v-overlay :value="overlay">

      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>

  
</template>

<script>
import firebase from "../firebase/firebaseInit";
import User from "../classes/User";

import Navigation from "../components/Nav";
export default {
  data() {
    return {
      email: null,
      password: null,
      overlay: false,
    };
  },
  components: {
    Navigation,
  },
  methods: {
    login: function(e) {

      this.overlay = !this.overlay
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            User.dispatch("authEmail", user.email);
              
            if (this.email == "admin@admin.com") {
             
              Toast.fire({
                icon: "success",
                title: `You are logged in as ${this.email}`,
              });

              this.$router.push("/admin");
               this.overlay = !this.overlay
            } else {
            
              Toast.fire({
                icon: "success",
                title: `You are logged in as ${this.email}`,
              });

              this.$router.push("/user");
                this.overlay = !this.overlay
            }
          },
          (err) => {
            this.overlay = !this.overlay
            Toast.fire({
              icon: "error",
              title: `${err.message}`,
            });
          }
        );
      e.preventDefault();
    },
  },
};
</script>

<style></style>
