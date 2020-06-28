import db from "../firebase/firebaseInit";

export default {
  state: {
    perGender: null,
    perDone: null,
  },
  actions: {
    async perDone({ commit }) {
      let data = [];

      await db
        .firestore()
        .collection("training")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            data.push(element.data().details.done);
          });

          let b = [];
          let prev;

          data.sort();
          data.forEach((el, key) => {
            if (data[key] !== prev) {
              b.push(1);
            } else {
              b[b.length - 1]++;
            }
            prev = data[key];
          });

          let notDone = Math.round((b[0] / data.length) * 100);
          let done = Math.round((b[1] / data.length) * 100);

          let obj = [done, notDone];

          console.log(obj)

          commit("setDoneData", obj);
        });
    },

    async perGender({ commit }) {
      let data = [];

      await db
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            console.log(element.data());
            data.push(element.data().gender);
          });

          let b = [];
          let prev;

          data.sort();
          data.forEach((el, key) => {
            if (data[key] !== prev) {
              b.push(1);
            } else {
              b[b.length - 1]++;
            }
            prev = data[key];
          });

          let female = Math.round((b[0] / data.length) * 100);
          let male = Math.round((b[1] / data.length) * 100);

          let obj = [male, female];

          commit("setGenderData", obj);
        });
    },
  },
  getters: {
    getGenderData: (state) => state.perGender,
    getDoneData: (state) => state.perDone,
  },
  mutations: {
    setGenderData: (state, data) => (state.perGender = data),
    setDoneData: (state, data) => (state.perDone = data),
  },
};
