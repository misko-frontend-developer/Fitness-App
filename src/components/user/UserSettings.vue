<template>
  <div>
    <h1>Profile Settings</h1>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4"></div>

          <div v-if="isEditing">
            <v-list-item-title class="headline mb-1" v-model="name">{{
              name
            }}</v-list-item-title>
          </div>
          <v-text-field class="input-name" v-else v-model="name"></v-text-field>
          <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>

          <div v-if="isEditing">
            <v-list-item-title class="headline mb-1" v-model="gender">{{
              gender
            }}</v-list-item-title>
          </div>

          <v-select
            v-else
            :items="items"
            :label="gender"
            
            v-model="gender"
          ></v-select>
        </v-list-item-content>

        <v-avatar color="indigo">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn @click="editUser" color="primary" text
          ><v-icon left>mdi-pencil</v-icon> Edit</v-btn
        >
        <v-btn color="error" text @click="deleteAccount"
          ><v-icon left>mdi-delete</v-icon> Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import User from "../../classes/User";

import firebase from "../../firebase/firebaseInit";

export default {
  beforeRouteEnter(to, from, next) {
    User.dispatch("currentUserData", firebase.auth().currentUser.email).then(
      () => {
        next();
      }
    );
  },
  data() {
    return {
      items: ["Male", "Female"],
      name: null,
      email: null,
      gender: null,
      isEditing: true,
    };
  },

  mounted() {
    this.name = User.getters("currentUserGetter")[0].name;
    this.email = User.getters("currentUserGetter")[0].email;
    this.gender = User.getters("currentUserGetter")[0].gender;
  },

  methods: {
    deleteAccount() {
     // confirm("Do you want to delete your account? ");

swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
  
    swalWithBootstrapButtons.fire(
      User.dispatch("deleteUser"),
      'Deleted!',
      'Your account has been deleted.',
      'success'
    )

  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'Your profile is safe :)',
      'error'
    )
  }
})

   
    },
    editUser() {
      this.isEditing = !this.isEditing;
        let obj = { name: this.name, email: this.email , gender :this.gender};
       User.dispatch("editUserName", obj);
    },
  },
};
</script>

<style scoped>
.input-name {
  width: 80px;
}
</style>
