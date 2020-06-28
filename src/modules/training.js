import db from "../firebase/firebaseInit";
import Training from "../classes/Training";

export default {
  state: {
    tranings: null,
    latestTrainingId: null,
    testObj: {},
  },
  actions: {
    // GENRATOR FOR OBJECT ADJUST VALUES TO IDS FOR BASE
    async objectGenerator({ commit }, obj) {
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

      await commit("testMutation", objUpdate);
    },
  
    //GET ALL TRAINING DATA
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

    //UPDATE TRAINING DATA
    async updateTraining({ commit }, obj) {
      Training.dispatch("objectGenerator", obj);
      let adjustedObj = Training.getters("testGetter");

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
          Training.insert({
            data: [
              {
                id: adjustedObj.id,
                name: adjustedObj.name,
                color: adjustedObj.color,
                start: adjustedObj.start,
                end: adjustedObj.end,
                details: adjustedObj.details,
              },
            ],
          })
        );
    },
    //CHANGE STATUS, TO DONE OR NOT
    async changeStatus({ commit }, obj) {
      let update_excercises = [];
      obj.details.excercises.forEach((element) => {
        let id = parseInt(
          element
            .split("[")
            .pop()
            .split("]")[0]
        );
        update_excercises.push(id);
      });

      await db
        .firestore()
        .collection("training")
        .where("id", "==", obj.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              details: {
                done: obj.details.done,
                excercises: update_excercises,
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
                  obj.name
                    .split("[")
                    .pop()
                    .split("]")[0]
                ),
              },
            });
          });
        });
      Training.update({
        where: obj.id,
        data: obj,
      });
    },
//DELETE TRAINING FROM FIREBASE 
    async deleteTraining({ commit }, id) {
     
      await db
        .firestore()
        .collection("training")
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        })
        .then(Training.delete(id));
    },
    //COLLECT LATEST TRAINING ID FROM FIREBASE
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

    // ADD NEW TRAINING
    async addNewTrainng({ commit }, obj) {
      Training.dispatch("objectGenerator", obj);
      let adjustedObj = Training.getters("testGetter");

      await db
        .firestore()
        .collection("training")
        .add(adjustedObj)
        .then(Training.insert({ data: [adjustedObj] }));
    },
  },
  getters: {
    getTrainingId: (state) => state.latestTrainingId,
    testGetter: (state) => state.testObj,
  },
  mutations: {
    setTrainingId: (state, id) => (state.latestTrainingId = id),
    testMutation: (state, obj) => (state.testObj = obj),
  },
};
