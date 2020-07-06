<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                class="mx-3"
                dark
                v-on="on"
                @click="loadDatainNew"
                >Add Training</v-btn
              >
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Add New Training</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="saveTrainingData">Save</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-container>
                <v-row>
                  <v-row justify="space-around">
                    <v-col>
                      <v-subheader>Choose User</v-subheader>
                      <multiselect
                        v-model="selectedUser"
                        :options="availableUsers"
                      >
                      </multiselect>
                      User:
                      <div>
                        <v-chip class="m-1" color="primary" text-color="white">
                          {{ selectedUser }}
                          <v-icon right>mdi-contact</v-icon>
                        </v-chip>
                      </div>
                    </v-col>
                    <v-col>
                      <v-subheader>Choose Intensity </v-subheader>
                      <multiselect
                        v-model="selectedIntensity"
                        :options="availableIntesity"
                      >
                      </multiselect>
                      Intensity:
                      <div>
                        <v-chip class="m-1" color="info" text-color="white">
                          {{ selectedIntensity }}
                          <v-icon right>mdi-chart-line</v-icon>
                        </v-chip>
                      </div>
                    </v-col>
                    <v-col>
                      <v-subheader>Choose Meal Plan</v-subheader>
                      <multiselect
                        v-model="selectedMealPlan"
                        :options="availableMealPlans"
                      ></multiselect>
                      Meal Plan:
                      <div>
                        <v-chip class="m-1" color="success" text-color="white">
                          {{ selectedMealPlan }}
                          <v-icon right>mdi-food</v-icon>
                        </v-chip>
                      </div>
                    </v-col>
                    <v-col>
                      <v-subheader>Choose Excercises</v-subheader>
                      <multiselect
                        v-model="selectedExcercise"
                        :options="availableExcercises"
                        :multiple="true"
                      ></multiselect>
                      Exercises:
                      <div v-for="exce in selectedExcercise" :key="exce.id">
                        <v-chip class="m-1" color="primary" text-color="white">
                          {{ exce }}
                          <v-icon right>mdi-dumbbell</v-icon>
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row justify="space-between">
                    <v-col class="">
                      <v-subheader>Choose Date </v-subheader>

                      <v-date-picker
                        v-model="dateTraining"
                        full-width
                        :landscape="$vuetify.breakpoint.smAndUp"
                        class="mt-4"
                      ></v-date-picker>
                    </v-col>
                    <v-col class="ml-6">
                      <v-subheader>Choose Color </v-subheader>
                      <v-color-picker
                        v-model="color"
                        hide-inputs
                        hide-mode-switch
                        class="mt-4 "
                      >
                      </v-color-picker>
                    </v-col>
                  </v-row>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
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
              <v-btn icon @click="markDone(selectedEvent)">
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>

              <v-dialog
                v-model="dialogEdit"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="
                      loadDatainNew();
                      bindDataEdit(selectedEvent);
                    "
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialogEdit = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Training</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="saveEditsData(selectedEvent)"
                        >Save Edits</v-btn
                      >
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-container>
                    <v-row justify="space-around">
                      <v-row>
                        <v-col
                          ><v-subheader>Choose User</v-subheader>
                          <multiselect
                            v-model="editSelectedUser"
                            :options="availableUsers"
                          ></multiselect>
                          <div>
                            <v-chip
                              class="m-1"
                              color="primary"
                              text-color="white"
                              >{{ editSelectedUser
                              }}<v-icon right>mdi-contact</v-icon>
                            </v-chip>
                          </div></v-col
                        >
                        <v-col>
                          <v-subheader>Choose Intensity </v-subheader>
                          <multiselect
                            v-model="editSelectedIntensity"
                            :options="availableIntesity"
                          ></multiselect>
                          <div>
                            <v-chip class="m-1" color="info" text-color="white"
                              >{{ editSelectedIntensity
                              }}<v-icon right>mdi-chart-line</v-icon>
                            </v-chip>
                          </div>
                        </v-col>
                        <v-col>
                          <v-subheader>Choose Meal Plan</v-subheader>
                          <multiselect
                            v-model="editSelectedMealPlan"
                            :options="availableMealPlans"
                          ></multiselect>
                          <div>
                            <v-chip
                              class="m-1"
                              color="success"
                              text-color="white"
                              >{{ editSelectedMealPlan
                              }}<v-icon right>mdi-food</v-icon>
                            </v-chip>
                          </div>
                        </v-col>
                        <v-col>
                          <v-subheader>Choose Excercises</v-subheader>
                          <multiselect
                            v-model="editSelectedExcercise"
                            :options="availableExcercises"
                            :multiple="true"
                          ></multiselect>
                          <div
                            v-for="exce in editSelectedExcercise"
                            :key="exce.id"
                          >
                            <v-chip
                              class="m-1"
                              color="primary"
                              text-color="white"
                              >{{ exce }}<v-icon right>mdi-dumbbell</v-icon>
                            </v-chip>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row>
                      
                        <v-col>
                          <v-subheader class="mr-5">Choose Date </v-subheader>

                          <v-date-picker
                            v-model="date2"
                            full-width
                            :landscape="$vuetify.breakpoint.smAndUp"
                            class="mt-4"
                          ></v-date-picker>
                        </v-col>
                          <v-col class="mt-3 ml-6">
                          <v-subheader>Choose Color </v-subheader>
                          <v-color-picker
                            v-model="editColor"
                            hide-inputs
                            hide-mode-switch
                          ></v-color-picker>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
              <v-btn @click="deleteTraining(selectedEvent)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="4">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Done :</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Excercises :</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Meal Plan :</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Intensity:</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="8">
                  <div v-for="event in selectedEvent.details" :key="event.id">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ event }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>

<script>
import Training from "../../classes/Training";
import Exercise from "../../classes/Exercise";
import MealPlans from "../../classes/MealPlans";
import User from "../../classes/User";
import Intensity from "../../classes/Intensity";

export default {
  async beforeRouteEnter(to, from, next) {
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
    //Models for Edit
    editSelectedUser: null,
    editSelectedMealPlan: null,
    editSelectedExcercise: [],
    editSelectedIntensity: null,
    date2: "2020-06-14",
    editColor: null,
    editDone: false,
    //Models for new User Entry

    selectedUser: null,
    selectedMealPlan: null,
    selectedExcercise: [],
    selectedIntensity: null,
    availableIntesity: [],
    availableExcercises: [],
    availableUsers: [],
    availableMealPlans: [],
    dateTraining: null,

    //Vuetify Calendar data
    overlay: true,
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
  }),

  computed: {
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
  },
  mounted() {
    this.collectTrainings();
    setTimeout(() => {
      let vm = this;
      vm.overlay = false;
    }, 1000);
  },

  methods: {
    //MARK TRAINING DONE
    markDone(data) {
      let obj = {
        id: data.id,
        color: data.color,
        start: data.start,
        end: data.end,
        name: data.name,
        details: {
          done: (data.details.done = !data.details.done),
          excercises: data.details.excercises,
          intensity_id: data.details.intensity,
          meal_plan_id: data.details.mealplans,
        },
      };

      Training.dispatch("changeStatus", obj);
      this.collectTrainings();
    },

    deleteTraining(id) {
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.value) {
            Training.dispatch("deleteTraining", id.id);
            this.collectTrainings();
            this.selectedOpen = false;
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your Training has been deleted.",
              "success"
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "We didnt delete it!",
              "error"
            );
          }
        });
    },
    // SAVE NEW TRAINING IN DATABASE
    saveTrainingData() {
      if (
        this.selectedExcercise.length !== 0 &&
        this.dateTraining !== null &&
        this.selectedUser !== null &&
        this.selectedIntensity !== null &&
        this.selectedMealPlan !== null
      ) {
        let obj = {
          id: Training.getters("getTrainingId"),
          color: this.color.hex,
          start: this.dateTraining,
          end: this.dateTraining,
          name: this.selectedUser,
          details: {
            done: this.done,
            excercises: this.selectedExcercise,
            intensity_id: this.selectedIntensity,
            meal_plan_id: this.selectedMealPlan,
            user_id: this.selectedUser,
          },
        };

        Training.dispatch("addNewTrainng", obj);

        this.collectTrainings();

        this.dialog = false;
        Toast.fire({
          icon: "success",
          title: "New Training added",
        });

        this.selectedMealPlan = null;
        this.selectedIntensity = null;
        this.selectedExcercise = null;
        this.selectedUser = null;
      } else {
        Toast.fire({
          icon: "warning",
          title: "Please enter all data",
        });
      }
    },

    // BIND DATA IN FIELDS FOR EDIT
    bindDataEdit(eventData) {
      this.editSelectedUser = eventData.name;
      this.editSelectedIntensity = eventData.details.intensity;
      this.editSelectedMealPlan = eventData.details.mealplans;
      this.editSelectedExcercise = eventData.details.excercises;
      this.editColor = eventData.color;
      this.date2 = eventData.start;
      this.editDone = eventData.details.done;
    },

    //SAVE DATA ON ADD NEW TRAINING
    saveEditsData(eventData) {
      if (
        this.editSelectedExcercise.length !== 0 &&
        this.date2 !== null &&
        this.editSelectedUser !== null &&
        this.editSelectedIntensity !== null &&
        this.editSelectedMealPlan !== null
      ) {
        let obj = {
          id: eventData.id,
          color: this.editColor,
          start: this.date2,
          end: this.date2,
          name: this.editSelectedUser,
          details: {
            done: this.editDone,
            excercises: this.editSelectedExcercise,
            intensity_id: this.editSelectedIntensity,
            meal_plan_id: this.editSelectedMealPlan,
            user_id: this.editSelectedUser,
          },
        };

        Training.dispatch("updateTraining", obj);

        this.collectTrainings();

        let upDetails = {
          done: this.editDone,
          excercises: this.editSelectedExcercise,
          intensity: this.editSelectedIntensity,
          mealplans: this.editSelectedMealPlan,
        };

        this.selectedEvent.details = upDetails;

        this.dialogEdit = false;
        this.selectedOpen = false;

        Toast.fire({
          icon: "success",
          title: "Details are edited",
        });
      } else {
        Toast.fire({
          icon: "warning",
          title: "Please enter all data",
        });
      }
    },

    //LOAD DATA IN ON ADD NEW TRAINING - FIELD VALUES
    loadDatainNew() {
      let users = [];
      let excer = [];
      let meal_plan = [];
      let intensity = [];
      Training.dispatch("collectTrainingId");

      User.all().forEach((user) => {
        users.push(` ${user.name} - [${user.user_id}]`);
      });
      this.availableUsers = users;

      MealPlans.all().forEach((meal) => {
        meal_plan.push(` ${meal.name} - [${meal.id}]`);
      });

      this.availableMealPlans = meal_plan;

      Intensity.all().forEach((intens) => {
        intensity.push(` ${intens.name} - [${intens.id}]`);
      });
      this.availableIntesity = intensity;

      Exercise.all().forEach((exc) => {
        excer.push(` ${exc.title} - [${exc.id}]`);
      });
      this.availableExcercises = excer;
    },

    // COLLECT ALL TRAINING DATA ON LOAD
    collectTrainings() {
      let trainings = Training.all();
      let newArray = [];
      let doneData;

      trainings.forEach((training) => {
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

      this.events = newArray;
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
<style>
.multiselect__element {
  color: blue;
}
.custom-class {
}
</style>
