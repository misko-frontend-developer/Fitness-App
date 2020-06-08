import db from "../firebase/firebaseInit";
import MealPlans from "../classes/MealPlans"
export default {

    state:{
        tranings:null

    },
    actions:{   

      async getMealPlans() {
        //  console.log(111)
           let data = [];
          await db
              .firestore()
              .collection("meal_plans")
              .get().then((querySnapshot) => {
                
              querySnapshot.forEach((element) => {
                
               data.push(element.data())
           
               
               
              }) 
             
               
              MealPlans.create({data: data})
              
          })
        }
        
        
    },
    getters:{


    },
    mutations:{
        
    }
    
}