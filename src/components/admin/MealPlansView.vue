<template>
  <v-container>
    <v-container class=" mt-s4 d-flex flex-row align-end justify-space-around ">
      
        <v-col cols="4" class="mt-12">
          <h4>Search saved recepies</h4>

          <v-text-field @keyup="searchOpt" v-model="search">
            <v-icon slot="append" color="primary">mdi-magnify</v-icon>
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <img width="250" :src="require('../../photos/diet2.svg')" alt="" />
        </v-col>
 
    </v-container>

    <v-row>
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="plans in displayMealPlans" :key="plans.id">
          <v-expansion-panel-header>{{ plans.name }} </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-template   class="d-flex flex-row justify-space-around">
              <v-card-subtitle>
                Calories: {{ plans.calories }}
              </v-card-subtitle>
              <v-card-subtitle> Fat: {{ plans.fat }} </v-card-subtitle>
              <v-card-subtitle>
                Carbohydrates: {{ plans.carbohydrates }}
              </v-card-subtitle>
              <v-card-subtitle> Protein: {{ plans.protein }} </v-card-subtitle>
            <v-card-subtitle>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    depressed
                    class="ml-6"
                    v-on="on"
                    small
                    color="primary"
                    @click="preEditBind(plans.name)"
                    > <v-icon>mdi-pencil</v-icon></v-btn
                  >
                </template>
                <v-form>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Change Name Of Selected Plan</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row  justify="center"> 
                          <v-col cols="8">
                            <v-text-field
                              type="text"
                              label="Change Name*"
                              v-model="nameChange"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false"
                        >Close</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="editName(plans.id)"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
              <v-btn
                depressed
                class="ml-8"
                small
                color="error"
                @click="deletePlan(plans.id)"
                > <v-icon>mdi-delete</v-icon></v-btn
              >
                
          </v-card-subtitle>
            </v-template>
            <v-divider></v-divider>
            <v-row>
              <v-container class="d-flex flex-row">
                <v-col>
                  <img
                    width="200"
                    :src="
                      'https://spoonacular.com/recipeImages/' +
                        plans.meal1.id +
                        '-312x231.' +
                        plans.meal1.imageType
                    "
                  />
                </v-col>
                <v-col>
                  <v-card-text>
                    {{ plans.meal1.title }}
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text>
                    Servings : {{ plans.meal1.servings }}
                    <v-icon> mdi-silverware</v-icon>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text>
                    Ready for: {{ plans.meal1.readyInMinutes }} min
                    <v-icon>mdi-alarm</v-icon>
                  </v-card-text>
                </v-col>
                <v-col class="my-2">
                  <v-btn icon :href="plans.meal1.sourceUrl" target="_blank"
                    ><v-icon>mdi-web</v-icon></v-btn
                  >
                </v-col>
              </v-container>
            </v-row>
  
            <v-divider></v-divider>
            <v-row>
              <v-container class="d-flex flex-row">
                <v-col>
                  <img
                    width="200"
                    :src="
                      'https://spoonacular.com/recipeImages/' +
                        plans.meal2.id +
                        '-312x231.' +
                        plans.meal2.imageType
                    "
                  />
                </v-col>
                <v-col>
                  <v-card-text>
                    {{ plans.meal2.title }}
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text>
                    Servings : {{ plans.meal2.servings }}
                    <v-icon> mdi-silverware</v-icon>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text>
                    Ready for: {{ plans.meal2.readyInMinutes }} min
                    <v-icon>mdi-alarm</v-icon>
                  </v-card-text>
                </v-col>
                <v-col class="my-2">
                  <v-btn icon :href="plans.meal2.sourceUrl" target="_blank"
                    ><v-icon>mdi-web</v-icon></v-btn
                  >
                </v-col>
              </v-container>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-container class="d-flex flex-row">
                <v-col>
                  <img
                    width="200"
                    :src="
                      'https://spoonacular.com/recipeImages/' +
                        plans.meal3.id +
                        '-312x231.' +
                        plans.meal3.imageType
                    "
                  />
                </v-col>
                <v-col>
                  <v-card-text>
                    {{ plans.meal3.title }}
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text>
                    Servings : {{ plans.meal3.servings }}
                    <v-icon> mdi-silverware</v-icon>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text>
                    Ready for: {{ plans.meal3.readyInMinutes }} min
                    <v-icon>mdi-alarm</v-icon>
                  </v-card-text>
                </v-col>
                <v-col class="my-2">
                  <v-btn icon :href="plans.meal1.sourceUrl" target="_blank"
                    ><v-icon>mdi-web</v-icon></v-btn
                  >
                </v-col>
              </v-container>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-divider></v-divider>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pagTotal"
        :total-visible="7"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import MealPlans from "../../classes/MealPlans";
export default {
  async beforeRouteEnter(to, from, next) {
    await Promise.all([MealPlans.dispatch("getMealPlans")]).then(() => {
      next();
    });
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      page: 1,
      perPage: 5,
      pagTotal: 6,
      search: "",
      getterSearch: "",
      nameChange: "",
    };
  },
  computed: {
    displayMealPlans() {
      //Create indexes for pagination & check for search
      let offsetData = 0 ;

        if(this.page == 1){

            offsetData = 0
        }else{
          offsetData = ((this.page - 1) * this.perPage ) + 1
        }

      if (this.getterSearch == "") {
        const allPlans = MealPlans.query().count() / this.perPage;
        this.pagTotal = Math.round(allPlans) + 1;

        let plans = MealPlans.query()
            .orderBy("id")
          .offset(offsetData)
          .limit(this.perPage)
          .get();

        return plans;
      } else {
        let queried = MealPlans.query()
           .orderBy("name")
          .search(this.getterSearch, {
            caseSensitive: false,
            threshold: 0.5,
            keys: ["name"],
          })
          .offset(0)
          .limit(this.perPage)
          
          .get();

        const allPlansSearch = queried.length / this.perPage;

        this.pagTotal = Math.round(allPlansSearch) + 1;

        return queried;
      }
    },
  },

  methods: {
    preEditBind(data) {
      this.nameChange = data;
    },

    editName(data) {
      if (this.nameChange == "") {
        Toast.fire({
          icon: "error",
          title: "Enter new Meal Plan name!",
          position: "center",
        });
      } else {
        let obj = {
          id: data,
          name: this.nameChange,
        };

        MealPlans.dispatch("updateMealPlan", obj);
        Toast.fire({
          icon: "success",
          title: "Data is changed!",
          position: "center",
        });
        this.dialog = false;
      }
    },
    deletePlan(id) {
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
            MealPlans.dispatch("deleteMealPlan", id);
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
    searchOpt() {
      this.getterSearch = this.search;
    },
  },
};
</script>

