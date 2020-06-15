import db from "../firebase/firebaseInit";
import Intensity from "../classes/Intensity";
export default {
  state: {
    tranings: null,
    intensityId: null,
  },
  actions: {
    async getIntensity() {
      let data = [];
      await db
        .firestore()
        .collection("intensity")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            data.push(element.data());
          });

          Intensity.insert({ data: data });
        });
    },

    async deleteIntensity({ commit }, id) {
      await db
        .firestore()
        .collection("intensity")
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });

          console.log("user deleted");
          Intensity.delete(id);
        });
    },
    async addIntensityData({ commit }, obj) {

      await db
        .firestore()
        .collection("intensity")
        .add({
          id: obj.id,
          sets: obj.sets,
          reps: obj.reps,
          name: obj.name,
          color: obj.color,
          break: obj.break,
        });

      Intensity.insert({ data:[obj] });
    },

    async collectIntensityId({ commit }) {
      let arrayID = [];
      await db
        .firestore()
        .collection("intensity")
        .orderBy("id")
        .limitToLast(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {

          
            arrayID.push(doc.data());
          });
        });
      const idIncrement = arrayID[0].id+1;
      
      commit("setIdIntensity", idIncrement);
    },
  },
  getters: {
    getIntensityId: (state) => state.intensityId,
  },
  mutations: {
    setIdIntensity: (state, id) => (state.intensityId = id),
  },
};
