<template>
<div>
    <div v-for="ii in intensity" :key=" ii.id">
            {{ii}}
    </div>
    

</div>

    
</template>
<script>
import Intensity from '../../classes/Intensity'
export default {

    data() { 
        return {

            intensity:[]

        }
        


       
    },

    mounted(){
          Intensity.dispatch('getIntensity');
        this.getIntensityData()
    },

    methods:{
        getIntensityData(){

              let allIntesity = Intensity.all()
              this.intensity  = allIntesity
        }
    }
    
}
</script>