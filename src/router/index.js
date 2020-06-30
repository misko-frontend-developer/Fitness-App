import Vue from "vue";
import Router from "vue-router";
//MAIN
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import NotFound from '../components/NotFound'
import firebase from "../firebase/firebaseInit";

//USER
import User from "../components/User"; 
import UserSettings from "../components/user/UserSettings";
import UserScheduler from "../components/user/userScheduler";

//ADMIN
import Admin from "../components/Admin";
import UsersPanel from "../components/admin/UsersPanel";
import Scheduler from "../components/admin/Scheduler";
import Intensity from "../components/admin/Intensity";
import Welcome from "../components/admin/Welcome";
import MealPlansView from "../components/admin/MealPlansView";
import AddMealPlan from "../components/admin/AddMealPlan";
import Exercises from "../components/admin/ExerciseAdmin";
import Stats from "../components/admin/Stats"


//import store from "../store";

Vue.use(Router);

//Loggedin user from store
//const loggedUser = store.state.entities.users.emailLoggedUser;
//const loggedUser = store.state.entities.users;

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/admin",
      name: "Admin",
      beforeEnter: checkAdminRights,
   
      component: Admin,
      children: [
        {
          path: "/",
          name: "welcome",
          beforeEnter: checkAdminRights,
          component: Welcome,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "userspanel",
          name: "userspanel",
          beforeEnter: checkAdminRights,
          component: UsersPanel,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "scheduler",
          name: "scheduler",
          beforeEnter: checkAdminRights,
          component: Scheduler,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "intensity",
          name: "intensity",
          beforeEnter: checkAdminRights,
          component: Intensity,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "meal-plans",
          name: "MealPlansView",
          beforeEnter: checkAdminRights,
          component: MealPlansView,
          meta: {
            requiresAuth: true,
          },
          
        },
        {
          path: "add-meal-plan",
          name: "AddMealPlan",
          beforeEnter: checkAdminRights,
          component: AddMealPlan,
          meta: {
            requiresAuth: true,
          },
          
        },
        {
          path: "exercises",
          name: "exercises",
          beforeEnter: checkAdminRights,
          component: Exercises,
          meta: {
            requiresAuth: true,
          },
          
        },
        {
          path: "stats",
          name: "stats",
          beforeEnter: checkAdminRights,
          component: Stats,
          meta: {
            requiresAuth: true,
          },
          
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/user/",
      name: "User",
      beforeEnter: checkUserRights,
      component: User,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "settings",
          name: "usersettings",
          beforeEnter: checkUserRights,
          component: UserSettings,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "calendar",
          name: "calendar",
          beforeEnter: checkUserRights,
          component: UserScheduler,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound,
    },
  ],
});



router.beforeEach((to, from ,next)=>{

    if(to.matched.some(record => record.meta.requiresAuth)){

          if(!firebase.auth().currentUser){
            next({
              path:'/login',
              query:{
                redirect: to.fullPath
              }
            })
          }else{
            next()
          }

    }else if(to.matched.some(record => record.meta.requiresGuest)){

      if(firebase.auth().currentUser){
        next({
          path:'/user',
          query:{
            redirect: to.fullPath
          }
        })
      }else{
        next();
      }
      
    }else{

      next();
      
    }

});

function checkUserRights(to, from, next) {
  let current = firebase.auth().currentUser.email;
  if (!current) {
    next("/login");
  } else if (current == "admin@admin.com") {
    next("/admin");
  } else {
    
    next();
  }
}

function checkAdminRights(to, from, next) {
  let current = firebase.auth().currentUser.email;
  

  if (!current) {
    next("/login");
  } else if (current == "admin@admin.com") {
    next();
  } else {
    next("/user");
  }

}

export default router;
