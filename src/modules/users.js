import db from "../firebase/firebaseInit";
import router from "../router/index";
import User from "../classes/User";

export default {
  state: {
    latestId: null,
    emailLoggedUser: null,
    currentUserDetails: null,
  },
  getters: {
    getId: (state) => state.latestId,
    getAuthEmail: (state) => state.idLoggedUser,
    currentUserGetter: (state) => state.currentUserDetails,
  },
  mutations: {
    setId: (state, id) => (state.latestId = id),
    authEmail: (state, email) => (state.emailLoggedUser = email),
    currentUserMutation: (state, data) => (state.currentUserDetails = data),
  },
  actions: {
    //Collect new ID for registration
    async collectId({ commit }) {
      let arrayID = [];
      await db
        .firestore()
        .collection("users")
        .orderBy("user_id")
        .limitToLast(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arrayID.push(doc.data());
          });
        });
      const idIncrement = arrayID[0].user_id + 1;
      commit("setId", idIncrement);
    },

    //Get All users for admin panel
    async getUsers({ dispatch }) {
      let data = [];
      let base = await db
        .firestore()
        .collection("users")
        .get();
      base.forEach((doc) => {
        let filterData = doc.data();
        data.push(filterData);
      });
      User.create({ data: data });
    },
    // Adding user from Register
    async addUser({ commit }, obj) {
      await db
        .firestore()
        .collection("users")
        .add({
          user_id: obj.user_id,
          name: obj.name,
          gender: obj.gender,
          email: obj.email,
        });
      User.insert({ obj });
    },
    // Profile details for the current logged user

    async currentUserData({ commit }, email) {
      let data = [];
      await db
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            data.push(element.data());

            commit("currentUserMutation", data);
          });
        });
    },
    //Delete user from Firebase, also users collection
    deleteUser() {
      let current = db.auth().currentUser;
      current
        .delete()
        .then(() => {
          db.auth()
            .signOut()
            .then(() => {
              db.firestore()
                .collection("users")
                .where("email", "==", current.email)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                  });
                });
             
              router.push("/login");
            });
        })
    },
    //Edit user name from collection USERS
    editUserName({ commit }, obj) {
      db.firestore()
        .collection("users")
        .where("email", "==", obj.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              name: obj.name,
              gender : obj.gender
            });
          });
        });
    },

    authEmail({ commit }, id) {
      commit("authEmail", id);
    },
  },
};
