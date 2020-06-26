<template>
    <v-template>
        <h1>Stats</h1>
        <p>{{getData}}</p>
    </v-template>
</template>

<script>
import User from '../../classes/User'
import Training from '../../classes/Training'

export default {

      async beforeRouteEnter(to, from, next) {
          
    await Promise.all([User.dispatch("getUsers"),
        Training.dispatch("getTrainings") ]).then(() => 
      next())
  },

  computed:{
      getData(){

          return User.query().with('training').get()
      }
  }
    
}
</script>

<style >

</style>