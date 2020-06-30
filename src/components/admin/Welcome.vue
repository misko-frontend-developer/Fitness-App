<template>
  
  <div>
    <h1>Welcome Admin</h1>
      <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>


<script>
export default {
 
  data(){
    return {
      overlay : true
    }
  },
  mounted(){
   
    setTimeout(()=>{
      let vm  = this
      vm.overlay = false
    },1000)
  },
  
}
</script>

<style>

</style>