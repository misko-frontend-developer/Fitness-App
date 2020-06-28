<template>
  <div>
    <div id="chart">
      <apexchart
        type="donut"
        :options="chartOptions"
        v-model="genderCount"
        :series="series"
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
 

       series: [],
        chartOptions: {
        labels: ['Male', 'Female'],
        
        },
    
    };
  },
  
  computed: {
   

    genderCount(){

  this.series = Stats.getters('getGenderData')
  
    }

    
  },
};
</script>

<style></style>
