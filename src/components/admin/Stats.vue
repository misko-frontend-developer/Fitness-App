<template>
    <div>
      

        <v-row  class="mt-10">
            <v-col>
                <h3>Users per Gender</h3>
                <PerGender/>
            </v-col>
            <v-col>
                <h3>Overall per Training</h3>

                <PerDone/>
            </v-col>

        </v-row>

    
    </div>
</template>

<script>
import Stats from '../../classes/Stats'
import User from '../../classes/User'
import Training from '../../classes/Training'
import PerGender from '../admin/stats/PerGender'
import PerDone from '../admin/stats/PerDone'
export default {

      async beforeRouteEnter(to, from, next) {
          
    await Promise.all([Stats.dispatch('perGender'),Stats.dispatch('perDone')]).then(() => 
      next())
  },

 
  components:{

      PerGender,
      PerDone

  }
    
}
</script>

<style >

</style>