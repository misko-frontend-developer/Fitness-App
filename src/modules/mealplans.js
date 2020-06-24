import db from "../firebase/firebaseInit";
import MealPlans from "../classes/MealPlans";

export default {
  state: {
    tranings: null,
    meal_plan_id: null,
    savedMealPlans: {},
    mealPlansAPI: {},
  },
  actions: {
    // EMPTY STATE ON LEAVE ADD NEW MEAL PLAN
    emptyState({ commit }) {
      let empty = {};
      commit("setEmptyRecepies", empty);
    },

    //COLLECT LATEST MEAL PLAN ID
    async collectMealPlanId({ commit }) {
      let arrayID = [];
      await db
        .firestore()
        .collection("meal_plans")
        .orderBy("id")
        .limitToLast(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arrayID.push(doc.data());
          });
        });
      const idIncrement = arrayID[0].id + 1;

      commit("setIdMealPlan", idIncrement);
    },
    // ADD NEW MEAL PLAN TO FIREBASE

    async addMealPlanData({ commit }, obj) {
      await db
        .firestore()
        .collection("meal_plans")
        .add({
          id: obj.id,
          calories: obj.obj.nutrients.calories,
          protein: obj.obj.nutrients.protein,
          fat: obj.obj.nutrients.fat,
          carbohydrates: obj.obj.nutrients.carbohydrates,
          meal1: obj.obj.meals[0],
          meal2: obj.obj.meals[1],
          meal3: obj.obj.meals[2],
          name: obj.name,
        });
    },

    //COLLECT MEAL PLANS FROM SPOONACULAR API
    async collectMealPlansAPI({ commit }, obj) {
      await this._vm.$http
        .get(
          "&targetCalories=" +
            obj.cal +
            "&diet=" +
            obj.diet +
            "&apiKey=fcc31449158b41ffa107596243839b6b"
        )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setMealPlansApi", data);
        });
    },

    //GET ALL MEAL PLANS FROM FIREBASE
    async getMealPlans({ commit }) {
      let data = [];
      await db
        .firestore()
        .collection("meal_plans")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            data.push(element.data());
          });

          MealPlans.create({ data: data });
        });
    },
    //UPDATE MEAL PLAN NAME
    async updateMealPlan({ commit }, obj) {
      await db
        .firestore()
        .collection("meal_plans")
        .where("id", "==", obj.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              name: obj.name,
            });
          });
        });
      MealPlans.update({
        where: obj.id,
        data: obj,
      });
    },

    //DELETE MEAL PLAN FROM FIREBASE
    async deleteMealPlan({ commit }, id) {
      await db
        .firestore()
        .collection("meal_plans")
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });

          MealPlans.delete(id);
        });
    },
  },
  getters: {
    getMealPlanId: (state) => state.meal_plan_id,
    getMealPlansAPI: (state) => state.mealPlansAPI,
    getSavedMealPlans: (state) => state.savedMealPlans,
  },
  mutations: {
    setIdMealPlan: (state, id) => (state.meal_plan_id = id),
    setMealPlansApi: (state, plans) => (state.mealPlansAPI = plans),
    setEmptyRecepies: (state, data) => (state.mealPlansAPI = data),
    setSavedMealPlans: (state, data) => (state.savedMealPlans = data),
  },
};
