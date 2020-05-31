<template>
  <div>
    <ul>
      <li><router-link to="/register">Register</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/">Home</router-link></li>
    </ul>
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
            <Alert/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase/firebaseInit";
import User from "../classes/User";
import Alert from "./Alerts";
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  components:{
    Alert

  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            User.dispatch("authEmail", user.email);

            if (this.email == "admin@admin.com") {
              alert(`You are logged in as ${this.email}`);
              this.$router.push("/admin");
            } else {
              alert(`You are logged in as ${this.email}`);
              this.$router.push("/user");
            }
          },
          (err) => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
  },
};
</script>

<style></style>
