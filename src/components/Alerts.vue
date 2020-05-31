<template>
  <v-app>
    <div v-for="data in getterAlert" :key="data.id">
      <v-alert :value="alert">{{ message }} </v-alert>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      alert: true,
      message: "",
      type: "",
    };
  },
  methods: {},
  computed: mapGetters(["getterAlert"]),
};
</script>

<style></style>
