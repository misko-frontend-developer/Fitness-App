<template>
  <div>
    <div >
      <apexchart
        type="pie"
        v-model="perDoneCount"
        :options="chartOptionse"
        :series="seriesa"
          width="400"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Stats from '../../../classes/Stats'

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      seriesa: [],
      chartOptionse: {
        chart: {
          width: 200,
          type: "pie",
     
        },
          
        labels: ["Done", "Not done"],
     
      },
    };
  },
 
  computed: {
    perDoneCount(){

  this.seriesa = Stats.getters('getDoneData')
  
    }
  },
};
</script>

<style></style>
