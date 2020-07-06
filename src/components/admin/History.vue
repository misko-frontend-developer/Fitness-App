<template>
  <div>
    <v-template>
      <v-row class="d-flex flex-row  align-center justify-space-between">
        <v-col cols="4">
          <h3>User: {{ userName }}</h3>
        </v-col>
        <v-col cols="4"> </v-col>
      </v-row>
      <v-expansion-panels class="mt-10">
        <v-expansion-panel v-for="detail in trainingDetails" :key="detail.id">
          <v-expansion-panel-header>
            <h3>
              <v-chip class="m-1" color="primary" text-color="white"
                >{{ detail.name }} <v-icon right>mdi-contact</v-icon>
              </v-chip>
            </h3></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row class="d-flex flex-row justify-space-around">
              <v-col cols="4"
                >Date:
                <v-chip class="m-1" color="warning" text-color="white">
                  {{ detail.start }}
                  <v-icon right>mdi-calendar</v-icon>
                </v-chip>
              </v-col>
              <v-col cols="4">
                <v-chip class="m-1" color="pink" text-color="white">
                  Done Training: {{ detail.details.done }}
                  <v-icon right>mdi-check</v-icon>
                </v-chip></v-col
              >
              <v-col cols="4">
                <v-chip class="m-1" color="info" text-color="white">
                  Done Training: {{ detail.details.intensity }}
                  <v-icon right>mdi-chart-line</v-icon>
                </v-chip></v-col
              >
            </v-row>

            <v-row class="d-flex flex-row justify-space-around">
              <v-col cols="4">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Exercises</th>
                        <th class="text-left">Names</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(dd, i) in detail.details.excercises"
                        :key="dd.id"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>
                          <v-chip
                            class="m-1"
                            color="primary"
                            text-color="white"
                          >
                            {{ dd }}
                            <v-icon right>mdi-dumbbell</v-icon>
                          </v-chip>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col cols="6">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left"></th>
                        <th class="text-left">Meal Plan Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>
                          <v-chip
                            class="m-1"
                            color="success"
                            text-color="white"
                          >
                            {{ detail.details.mealplans }}
                            <v-icon right>mdi-food</v-icon>
                          </v-chip>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="pagTotal"
          :total-visible="7"
        ></v-pagination>
      </div>
    </v-template>
  </div>
</template>

<script>
import Training from "../../classes/Training";
import Exercise from "../../classes/Exercise";
import MealPlans from "../../classes/MealPlans";
import User from "../../classes/User";
import Intensity from "../../classes/Intensity";
import Stats from "../../classes/Stats";

export default {
  async beforeRouteEnter(to, from, next) {
    let vm = this;
    await Promise.all([
      Intensity.dispatch("getIntensity"),
      Training.dispatch("getTrainings"),
      MealPlans.dispatch("getMealPlans"),
      Exercise.dispatch("getExercise"),
      User.dispatch("getUsers"),
    ]).then(() => {
      next();
    });
  },
  data() {
    return {
      page: 1,
      perPage: 5,
      pagTotal: 6,
      trainingDetails: [],
      userName: "",
    };
  },

  methods: {
    //Get training details 
    trainingData() {
      let routeId = this.$route.params.user_id;
      let trainings = Training.all();
      let newArray = [];

      let novo = [];

      trainings.forEach((tt) => {
        if (tt.details.user_id == routeId) {
          novo.push(tt);
        }
      });

      novo.forEach((training) => {
        let excerArray = [];
        Exercise.query()
          .whereIdIn(training.details.excercises)
          .get()
          .forEach((element) => {
            excerArray.push(`${element.title} - [${element.id}]`);
          });

        let intesArray = [];
        Intensity.query()
          .where("id", training.details.intensity_id)
          .get()
          .forEach((element) => {
            intesArray.push(`${element.name} - [${element.id}]`);
          });

        let user_name = User.query()
          .where("user_id", training.details.user_id)
          .get();

        let obj = {
          id: training.id,
          name: user_name[0].name + ` [${training.details.user_id}]`,
          color: training.color,
          start: training.start,
          end: training.end,
          details: {
            done: training.details.done,
            excercises: excerArray,
            mealplans:
              MealPlans.query()
                .where("id", training.details.meal_plan_id)
                .get()[0].name + ` [${training.details.meal_plan_id}]`,
            intensity: intesArray[0],
          },
        };

        newArray.push(obj);
      });

      this.trainingDetails = newArray;
      this.userName = newArray[0].name;
      this.pagTotal = newArray.length / this.perPage;
    },
  },
  created() {
    Stats.dispatch("statsPerUser", this.$route.params.user_id);
  },

  mounted() {
    this.trainingData();
  },
};
</script>

<style></style>
