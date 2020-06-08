<template>
  <div data-app>
    <Navigation />

    <form>
      <v-text-field v-model="name" :counter="10" label="Name"></v-text-field>
      <v-text-field
        type="password"
        v-model="password"
        label="Password"
      ></v-text-field>
      <v-text-field v-model="email" label="E-mail"></v-text-field>
      <v-select :items="items" v-model="gender" :value="items"></v-select>

      <v-btn class="mr-4" @click="register">Register</v-btn>
    </form>
  </div>
</template>

<script>
import firebase from "../firebase/firebaseInit";
import User from "../classes/User";
import Navigation from "../components/Nav";
import { mapActions } from "vuex";
export default {
  name: "register",

  data() {
    return {
      items: ["Male", "Female"],
      email: "",
      password: "",
      gender: null,
      user_id: null,
      name: "",
      registerData: null,
    };
  },
  components: {
    Navigation,
  },
  created() {
    User.dispatch("collectId");
  },
  computed: {
    getId() {
      return User.getters("getId");
    },
  },

  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            User.dispatch("addUser", {
              user_id: this.getId,
              name: this.name,
              email: this.email,
              gender: this.gender,
            });

            this.$router.push("/login");
          },
          (err) => {
          
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
