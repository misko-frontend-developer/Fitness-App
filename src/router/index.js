import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Register'
import Login from '../components/Login'
import Admin from '../components/Admin'
import User from '../components/User'



Vue.use(Router)

export default new Router({ 
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register,
    
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    
    },
    {
      path: '/admin:email',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user:email',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
]});




