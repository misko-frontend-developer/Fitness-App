<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel grey lighten-4 black-text center">
            <h3>Register</h3>
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
                v-on:click="register"
                class="btn btn-large btn-extended grey lighten-4 black-text"
              >Register</button>
            </form>
          </div>   
        </div>
     
      </div>
    </div>
       <button   v-on:click="randomFunkcija">Crazy</button>
  </div>
</template>

<script>
import firebase from "../firebase/firebaseInit";

import User from "../classes/User";
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      gender: "male",
      user_id:null,
      username: "Test",
      registerData: null
    };
  },

mounted(){
 
 User.dispatch('collectId')
  
},
created(){



 return this.user_id = User.getters('getId')
}
  
,

  methods: {
 

    randomFunkcija(){

      console.log(this.user_id)
    },

    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            
            //User.dispatch('addUser', registerData)

            //this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );


      e.preventDefault();
    }
  },

};
</script>