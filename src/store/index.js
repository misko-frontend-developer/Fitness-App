import Vue from 'vue'
import Vuex from 'vuex'
import Multiselect from 'vue-multiselect'
import VuexORM from '@vuex-orm/core'
import user from '../modules/users'
import User from '../classes/User'
import FlashMessage from '@smartweb/vue-flash-message';



Vue.use(FlashMessage);
Vue.use(Vuex)
Vue.component('multiselect', Multiselect)

const database = new VuexORM.Database()

database.register(User, user)

export default new Vuex.Store({

  plugins :[VuexORM.install(database)]

})