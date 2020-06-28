<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined color="grey darken-2" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="400px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>

              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="bindDataEdit(selectedEvent)"
                  >
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>View Training</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="exportPdf(selectedEvent)"
                        >Save PDF<v-icon> mdi-file-pdf</v-icon></v-btn
                      >
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-container id="app">
                    <v-row justify="space-around">
                      <v-col>
                        <v-subheader>Training Intensity </v-subheader>
                        <v-row>
                          <h6 class="mx-3">Name: {{ intesityName }}</h6>
                          <h6 class="mx-3">Sets: {{ sets }}</h6>
                          <h6 class="mx-3">Reps: {{ reps }}</h6>
                          <h6 class="mx-3">Breaks: {{ breaks }} min</h6>
                        </v-row>
                      </v-col>
                      <v-col>
                        <v-subheader>Training date</v-subheader>
                        <v-container>{{ dateTraining }}</v-container>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col>
                        <v-subheader> Meal Plan</v-subheader>
                        <v-card>
                          <v-col>
                            <v-row align="center">
                              <v-col>
                                <img
                                  width="100"
                                  :src="
                                    'https://spoonacular.com/recipeImages/' +
                                      mealplan1Img +
                                      '-312x231.jpg'
                                  "
                              /></v-col>
                              <v-col
                                >Link :
                                <v-btn icon :href="mealplan1Web" target="_blank"
                                  ><v-icon>mdi-web</v-icon></v-btn
                                ></v-col
                              >
                              <v-col>
                                <v-card-subtitle
                                  >{{ mealplan1Title }}
                                </v-card-subtitle></v-col
                              >
                            </v-row>
                            <v-row align="center">
                              <v-col>
                                <img
                                  width="100"
                                  :src="
                                    'https://spoonacular.com/recipeImages/' +
                                      mealplan2Img +
                                      '-312x231.jpg'
                                  "
                              /></v-col>
                              <v-col
                                >Link :
                                <v-btn icon :href="mealplan2Web" target="_blank"
                                  ><v-icon>mdi-web</v-icon></v-btn
                                ></v-col
                              >
                              <v-col>
                                <v-card-subtitle
                                  >{{ mealplan2Title }}
                                </v-card-subtitle></v-col
                              >
                            </v-row>
                            <v-row align="center">
                              <v-col>
                                <img
                                  width="100"
                                  :src="
                                    'https://spoonacular.com/recipeImages/' +
                                      mealplan3Img +
                                      '-312x231.jpg'
                                  "
                              /></v-col>
                              <v-col
                                >Link :
                                <v-btn icon :href="mealplan2Web" target="_blank"
                                  ><v-icon>mdi-web</v-icon></v-btn
                                ></v-col
                              >
                              <v-col>
                                <v-card-subtitle
                                  >{{ mealplan2Title }}
                                </v-card-subtitle></v-col
                              >
                            </v-row>
                          </v-col>
                        </v-card>
                      </v-col>
                      <v-col>
                        <v-subheader>Exercises</v-subheader>
                        <v-card>
                          <div v-for="ex in excercises" :key="ex.id">
                            <v-btn
                              color="primary"
                              :href="
                                'https://www.youtube.com/watch?v=' + ex.video
                              "
                              target="_blank"
                            >
                              {{ ex.title }}
                              <v-icon class="mx-3">mdi-label</v-icon>
                            </v-btn>
                            <v-card-subtitle></v-card-subtitle>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>

                    <div id="pdf"></div>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-card-text> </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "../../firebase/firebaseInit";
import Training from "../../classes/Training";
import MealPlans from "../../classes/MealPlans";
import Intensity from "../../classes/Intensity";
import Exercise from "../../classes/Exercise";
import User from "../../classes/User";

import html2canvas from "html2canvas";
import * as JsPDF from "jspdf";

import Excercise from "../../classes/Exercise";
export default {
  async beforeRouteEnter(to, from, next) {
    await Promise.all([
      Training.dispatch("getTrainings"),
      MealPlans.dispatch("getMealPlans"),
      Intensity.dispatch("getIntensity"),
      Exercise.dispatch("getExercise"),
      User.dispatch("getUserId", firebase.auth().currentUser.email),
       User.dispatch("currentUserData", firebase.auth().currentUser.email)
    ]).then(() => {
      next();
    });
  },
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "week",
      day: "Day",
      "4day": "4 Days",
    },

    //Vuetify Calendar data
    excercises: [],
    mealplans: [],
    intesity: false,

    dialogEdit: false,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    name: null,
    details: null,
    start: null,
    end: null,
    test: null,
    color: null,
    done: false,
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    breaks: null,
    sets: null,
    intesityName: null,
    reps: null,
    dateTraining: null,
    mealplan1Img: null,
    mealplan1Title: null,
    mealplan1Web: null,
    mealplan2Img: null,
    mealplan2Title: null,
    mealplan2Web: null,
    mealplan3Img: null,
    mealplan3Title: null,
    mealplan3Web: null,
  }),

  mounted() {
    this.collectTraings();
  },

  computed: {
    getName(){
      return User.getters('currentUserGetter')
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },


    userIdGetter(){

      return User.getters("getUserId");
    }


  },
  methods: {
    exportPdf(ev) {
      html2canvas(document.querySelector("#app"), {
        imageTimeout: 2000,

        scale: 4,
      }).then((canvas) => {
        document.getElementById("pdf").appendChild(canvas);
        let img = canvas.toDataURL("image/png");
        let pdf = new JsPDF("landscape", "mm", "a4");
        pdf.addImage(img, "PNG", 15, 15, 300, 100);
        pdf.save("relatorio-remoto.pdf");

        document.getElementById("pdf").innerHTML = "";
      });
    },

    bindDataEdit(data) {
     

      let excerArray = [];

      let inte = Intensity.find(data.details.intensity_id);
      let mealp = MealPlans.find(data.details.meal_plan_id);

      data.details.excercises.forEach((el) => {
        excerArray.push(el);
      });

      let excer = Excercise.query()
        .whereIdIn(excerArray)
        .get();

     
      this.excercises = excer;
      this.intesity = inte;
      this.dateTraining = data.start;

      this.intesityName = inte.name;
      this.sets = inte.sets;
      this.breaks = inte.break;
      this.reps = inte.reps;

      this.mealplan1Img = mealp.meal1[0];
      this.mealplan1Web = mealp.meal1[2];
      this.mealplan1Title = mealp.meal1[3];

      this.mealplan2Img = mealp.meal2[0];
      this.mealplan2Web = mealp.meal2[2];
      this.mealplan2Title = mealp.meal2[3];

      this.mealplan3Img = mealp.meal3[0];
      this.mealplan3Web = mealp.meal3[2];
      this.mealplan3Title = mealp.meal3[3];
    },
    collectTraings() {
      let randomArray = [];
      let trainings = Training.all();
      console.log(trainings)
      console.log(this.getName[0].name)
      let userId = this.userIdGetter

      trainings.forEach((training) => {
        if (training.details.user_id == userId) {

              let updatedTraining ={
                      id: training.id,
          name: this.getName[0].name + ` [${training.details.user_id}]`,
          color:training.color,
          start: training.start,
          end:training.end,
          details: training.details
          }
            console.log(updatedTraining)
          randomArray.push(updatedTraining);
        }
      });

      this.events = randomArray;
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
      }
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    },
  },
};
</script>
