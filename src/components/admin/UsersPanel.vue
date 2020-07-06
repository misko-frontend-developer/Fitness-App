<template>
  <div>
    <v-row  class=" d-flex flex-row align-center justify-space-around">
       <v-col cols="5"> 
         
            <img width="300" :src="require('../../photos/training.svg')" alt="" />
      </v-col>
      <v-col cols="3"> 
        
        <h6>Search Users history</h6>
         <v-text-field @keyup="searchOpt" v-model="search">
      <v-icon slot="append" color="primary">mdi-magnify</v-icon>
    </v-text-field>

      </v-col>
    </v-row>
   
    <v-simple-table class="mt-5">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Gender</th>
          <th class="text-left">History</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in displayUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.gender }}</td>
          <td>
            <router-link 
              :to="{ name: 'history', params: { user_id: user.user_id } }"
            >
              <v-icon @click="test(user.user_id)" >mdi-file</v-icon>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <v-content>
      <v-container fluid>
        <router-view name="a" :key="$route.fullPath"></router-view>
      </v-container>
    </v-content>

    
  
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="pagTotal"
            :total-visible="7"
          ></v-pagination>
        </div>
     


    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Users from "../../classes/User";
import Stats from "../../classes/Stats";

export default {

  data() {
    return {
      overlay: true,
      search: "",
      getterSearch: "",
      page: 1,
      perPage: 5,
      pagTotal: 6,
    };
  },
  mounted() {
    setTimeout(() => {
      let vm = this;
      vm.overlay = false;
    }, 1000);
  },
  computed: {
    displayUsers() {
      //Create indexes for pagination & check for search
      let offsetData = 0;

      if (this.page == 1) {
        offsetData = 0;
      } else {
        offsetData = (this.page - 1) * this.perPage + 1;
      }

      if (this.getterSearch == "") {
        const allUsers = Users.query().count() / this.perPage;
        this.pagTotal = Math.round(allUsers) + 1;

        let plans = Users.query()
          .orderBy("id")
          .offset(offsetData)
          .limit(this.perPage)
          .get();

        return plans;
      } else {
        let queried = Users.query()
          .orderBy("name")
          .search(this.getterSearch, {
            caseSensitive: false,
            threshold: 0.5,
            keys: ["name", "email"],
          })
          .offset(0)
          .limit(this.perPage)

          .get();

        const allUsersSearch = queried.length / this.perPage;

        this.pagTotal = Math.round(allUsersSearch) + 1;

        return queried;
      }
    },
  },

  methods: {
    test(id){
      Stats.dispatch('statsPerUser', id)
    },
    searchOpt() {
      this.getterSearch = this.search;
    },
  },
  created() {
    Users.dispatch("getUsers");
  },
};
</script>

<style></style>
