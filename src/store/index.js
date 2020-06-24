import Vue from 'vue'
import Vuex from 'vuex'
import Multiselect from 'vue-multiselect'
import VuexORM from '@vuex-orm/core'
import VuexORMSearch from '@vuex-orm/plugin-search'
import VueResource from 'vue-resource'
import user from '../modules/users'
import User from '../classes/User'
import training from '../modules/training'
import Training from '../classes/Training'
import mealplans from '../modules/mealplans'
import MealPlans from '../classes/MealPlans'
import exercise from '../modules/excercise'
import Exercise from '../classes/Exercise'
import intensity from '../modules/intensity'
import Intensity from '../classes/Intensity'
import Swal from 'sweetalert2'



Vue.component('multiselect', Multiselect)
Vue.use(Vuex)
Vue.use(VueResource)
VuexORM.use(VuexORMSearch, {
  
  threshold: 0,
  minMatchCharLength:5})  

Vue.http.options.root ='https://api.spoonacular.com/mealplanner/generate?'

//Alerting global properties 

window.Swal = Swal

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast;
window.swalWithBootstrapButtons = swalWithBootstrapButtons;




const database = new VuexORM.Database()

database.register(User, user)
database.register(Training, training)
database.register(Exercise, exercise)
database.register(MealPlans, mealplans)
database.register(Intensity, intensity)

export default new Vuex.Store({

  plugins :[VuexORM.install(database)]

})