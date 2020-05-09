<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  
   data () {
      return {
        value: null,
        options: ['list', 'of', 'options']
      }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
