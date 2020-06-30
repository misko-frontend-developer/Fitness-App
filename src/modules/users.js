import db from "../firebase/firebaseInit";
import router from "../router/index";
import User from "../classes/User";

export default {
  state: {
    latestId: null,
    emailLoggedUser: null,
    currentUserDetails: null,
    userIdQuery: null,
  },
  getters: {
    getId: (state) => state.latestId,
    getAuthEmail: (state) => state.idLoggedUser,
    currentUserGetter: (state) => state.currentUserDetails,
    getUserId: (state) => state.userIdQuery,
  },
  mutations: {
    setId: (state, id) => (state.latestId = id),
    authEmail: (state, email) => (state.emailLoggedUser = email),
    currentUserMutation: (state, data) => (state.currentUserDetails = data),
    setUserId: (state, data) => (state.userIdQuery = data),
  },
  actions: {
    //COLLECT NEW ID FOR REGISTRATION 
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

    //COLLECT ALL USERS FOR ADMIN PANEL
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
    // ADD NEW USER TO FIREBASE FROM REGISTER
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
    // PROFILE DETAILS FOR CURRENT USER LOGGED 

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
    //DELETE USER ACCESS TO FIRESTORE AND RENAME IN FIREBASE 
    deleteUser() {
      let current = db.auth().currentUser;
      current.delete().then(() => {
        db.auth()
          .signOut()
          .then(() => {
            db.firestore()
              .collection("users")
              .where("email", "==", current.email)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref.update({
                    name: "DeletedUser",
                  });
                });
              });

            router.push("/login");
          });
      });
    },
    //EDIT USER NAME IN FIREBASE 
    editUserName({ commit }, obj) {
      db.firestore()
        .collection("users")
        .where("email", "==", obj.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              name: obj.name,
              gender: obj.gender,
            });
          });
        });
    },

    authEmail({ commit }, id) {
      commit("authEmail", id);
    },
    //GET CURRENT USER ID FROM FIREBASE - USER SCHEDULER
    async getUserId({ commit }, email) {
      let idGen = [];
      await db
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            idGen.push(doc.data());
          });

          let getID = idGen[0].user_id;
          commit("setUserId", getID);
        });
    },
  },
};
