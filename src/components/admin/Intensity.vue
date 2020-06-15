<template>
  <v-container>
    <v-row justify="space-around">
      <div v-for="int in getIntensityData" :key="int.id">
        <v-sheet
          elevation="20"
          :color="int.color"
          class="mx-auto "
          height="130"
          width="200"
        >
          <v-row>
            <v-col class="mx-5">
              <h4>{{ int.name }}</h4>
              <h6>Sets : {{ int.sets }}</h6>
              <h6>Reps: {{ int.reps }}</h6>
              <h6>Break: {{ int.break }} min</h6>
            </v-col>

            <v-btn
              @click="deleteInt(int.id)"
              color="grey lighten-5"
              fab
              x-small
              white
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-sheet>
      </div>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-2"
          absolute
          right
          bottom
          v-on="on"
          fab
          dark
          color="indigo"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-form>
        <v-card>
          <v-card-title>
            <span class="headline">Add New Intensity</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    type="number"
                    min="0"
                    label="Break / minutes*"
                    hint="How many min for brake?"
                    v-model="breaks"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    type="number"
                    min="0"
                    label="Reps*"
                    hint="How many repetition you need?"
                    v-model="reps"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    type="number"
                    min="0"
                    label="Sets*"
                    hint="How many sets do you need?"
                    persistent-hint
                    v-model="sets"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Name*"
                    v-model="name"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-color-picker
                  width="400px"
                  v-model="colorPicked"
                  hide-inputs
                ></v-color-picker>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >

            <v-btn color="blue darken-1" text @click="addIntensityData"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>
<script>
import Intensity from "../../classes/Intensity";
export default {
  beforeRouteEnter(to, from, next) {
    Intensity.dispatch("getIntensity").then(() => {
      next();
    });
  },

  data() {
    return {
      intensity: [],
      dialog: false,
      colorPicked: null,
      sets: "",
      reps: "",
      breaks: "",
      name: "",
    };
  },

  
  created() {
    Intensity.dispatch("collectIntensityId");
  },
  computed: {
    getIntensityId() {
      return Intensity.getters("getIntensityId");
    },
    getIntensityData() {
      return Intensity.all();
    },
  },

  methods: {
    deleteInt(id) {
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
            Intensity.dispatch("deleteIntensity", id),
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your data has been deleted.",
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

    addIntensityData() {
      if (
        this.set == "" ||
        this.reps == "" ||
        this.breaks == "" ||
        this.namme == ""
      ) {
        Toast.fire({
          icon: "warning",
          title: "Please enter all data",
        });
      } else {
        let obj = {
          id: this.getIntensityId,
          sets: this.sets,
          reps: this.reps,
          name: this.name,
          color: this.colorPicked.hex,
          break: this.breaks,
        };

        Intensity.dispatch("addIntensityData", obj);

        Toast.fire({
          icon: "success",
          title: "New record added",
        });

        this.sets = "";
        this.reps = "";
        this.breaks = "";
        this.name = "";
        this.dialog = false;
      }
    },
  },
};
</script>

<style scoped>
h6,
h4 {
  color: #ffff;
}
</style>
