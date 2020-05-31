import Vue from "vue";
import Router from "vue-router";
import Register from "../components/Register";
import Login from "../components/Login";
import Admin from "../components/Admin";
import User from "../components/User";
import Home from "../components/Home";

import UsersPanel from "../components/admin/UsersPanel";
import Welcome from "../components/admin/Welcome";
import UserSettings from "../components/user/UserSettings";
import firebase from "../firebase/firebaseInit";

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
        },
        {
          path: "userspanel",
          name: "userspanel",
          beforeEnter: checkAdminRights,
          component: UsersPanel,
        },
      ],
    },
    {
      path: "/user/",
      name: "User",
      beforeEnter: checkUserRights,
      component: User,
      children: [
        {
          path: "settings",
          name: "usersettings",
          beforeEnter: checkUserRights,
          
          component: UserSettings,
        },
      ],
    },
  ],
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
    next("/");
  }

}

export default router;
