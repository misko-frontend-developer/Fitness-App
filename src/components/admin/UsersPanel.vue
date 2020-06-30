<template>
  <div>
    <h1>Users Panel</h1>
    <template>
  <v-simple-table>
    
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Name</th>
        <th class="text-left">Email</th>
        <th class="text-left">Gender</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.gender }}</td>
      </tr>
    </tbody>
  
  </v-simple-table>
  </template>
   <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
  
</template>

<script>
import Users from "../../classes/User";

export default {
   beforeRouteEnter(to, from, next) {

    next();
   
  },
  data(){
    return {
      overlay : true
    }
  },
  methods:{
   
  },
  created() {
    Users.dispatch("getUsers");


  },
 computed:{
     users(){
         return Users.all(); 
    
   }
 },
 mounted(){
   
    setTimeout(()=>{
      let vm  = this
      vm.overlay = false
    },1000)
  
 }
}
</script>

<style></style>
