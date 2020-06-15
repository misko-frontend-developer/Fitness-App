import db from "../firebase/firebaseInit";
import Training from "../classes/Training";
export default {
  state: {
    tranings: null,
    latestTrainingId: null,
    testObj :{}
   
  },
  actions: {
   async objectGenerator({commit},obj) {
      let excercises_ids = [];

      obj.details.excercises.forEach((element) => {
        let id = parseInt(
          element
            .split("[")
            .pop()
            .split("]")[0]
        );
        excercises_ids.push(id);
      });

      let objUpdate = {
        id: obj.id,
        color: obj.color,
        start: obj.start,
        end: obj.end,
        name: obj.name,
        details: {
          done: obj.details.done,
          excercises: excercises_ids,
          intensity_id: parseInt(
            obj.details.intensity_id
              .split("[")
              .pop()
              .split("]")[0]
          ),
          meal_plan_id: parseInt(
            obj.details.meal_plan_id
              .split("[")
              .pop()
              .split("]")[0]
          ),
          user_id: parseInt(
            obj.details.user_id
              .split("[")
              .pop()
              .split("]")[0]
          ),
        },
      };
      
    await commit('testMutation',objUpdate)
    },
    async getTrainings() {
      let data = [];
      await db
        .firestore()
        .collection("training")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            data.push(element.data());
          });

          Training.create({ data: data });
        });
    },
    async updateTraining({ commit }, obj) {

      Training.dispatch('objectGenerator',obj);
      let adjustedObj = Training.getters('testGetter')

      await db
        .firestore()
        .collection("training")
        .where("id", "==", obj.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              id: adjustedObj.id,
              color: adjustedObj.color,
              start: adjustedObj.start,
              end: adjustedObj.end,
              name: adjustedObj.name,
              details: adjustedObj.details,
            });
          });
        })
        .then(
          Training.update({
            where: obj.id,
            data: [
              {
              done:adjustedObj.details.done
              },
            ],
          })
        );
    },
    async changeStatus({ commit }, data) {
      await db
        .firestore()
        .collection("training")
        .where("id", "==", data.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              id: objUpdate.id,
              color: objUpdate.color,
              start: objUpdate.start,
              end: objUpdate.end,
              name: objUpdate.name,
              details: objUpdate.details,
            });
          });
        });
    },
    async collectTrainingId({ commit }) {
      let arrayID = [];
      await db
        .firestore()
        .collection("training")
        .orderBy("id")
        .limitToLast(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arrayID.push(doc.data());
          });
        });
      const idIncrement = arrayID[0].id + 1;

      commit("setTrainingId", idIncrement);
    },
    async addNewTrainng({ commit }, obj) {


      Training.dispatch('objectGenerator',obj);
      let adjustedObj = Training.getters('testGetter')
    
      await db
        .firestore()
        .collection("training")
        .add(adjustedObj)
        .then(Training.insert({ data: [adjustedObj] }));
    },
   
  },
  getters: {
    getTrainingId: (state) => state.latestTrainingId,
    testGetter :(state)=> state.testObj
  },
  mutations: {
    setTrainingId: (state, id) => (state.latestTrainingId = id),
    testMutation :(state, obj) =>(state.testObj = obj)
    
  }
}