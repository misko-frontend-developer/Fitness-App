import db from "../firebase/firebaseInit";
import Exercise from "../classes/Exercise";
import Excercise from "../classes/Exercise";
export default {
  state: {
    tranings: null,
    exceriseId: null,
  },
  actions: {

    //GET ALL EXERCISE DATA 
    async getExercise() {
      let data = [];
      await db
        .firestore()
        .collection("exercise")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            data.push(element.data());
          });

          Exercise.create({ data: data });
        });
    },
    //COLLECT LATEST EXERCISE ID 
    async collectExerciseId({ commit }) {
      let arrayID = [];
      await db
        .firestore()
        .collection("exercise")
        .orderBy("id")
        .limitToLast(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arrayID.push(doc.data());
          });
        });
      const idIncrement = arrayID[0].id + 1;

      commit("setExerciseId", idIncrement);
    },
    // ADD NEW EXERCISE IN FIREBASE 
    async addExerciseData({ commit }, obj) {
      await db
        .firestore()
        .collection("exercise")
        .add({
          id: obj.id,
          title: obj.title,
          video: obj.video,
          group: obj.group,
          desc: obj.desc,
        });

      Exercise.insert({ data: [obj] });
    },

    //UPDATE EXERCISE DATA IN FIREBASE 
    async updateExcerciseData({ commit }, obj) {
      await db
        .firestore()
        .collection("exercise")
        .where("id", "==", obj.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              id: obj.id,
              title: obj.title,
              video: obj.video,
              desc: obj.desc,
              group: obj.group,
            });
          });
        })
        .then(
          Excercise.insert({
            data: [
              {
                id: obj.id,
                title: obj.title,
                video: obj.video,
                desc: obj.desc,
                group: obj.group,
              },
            ],
          })
        );
    },
    //DELETE EXERCISE DATA FROM FIREBASE
    async deleteExercise({ commit }, id) {
      await db
        .firestore()
        .collection("exercise")
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        })
        .then(Exercise.delete(id));
    },
  },
  getters: {
    getExercisesId: (state) => state.exerciseId,
  },
  mutations: {
    setExerciseId: (state, id) => (state.exerciseId = id),
  },
};
