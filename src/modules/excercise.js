import db from "../firebase/firebaseInit";
import Excercise from "../classes/Exercise"
export default {

    state:{
        tranings:null

    },
    actions:{   

      async getExcercises() {
      
           let data = [];
          await db
              .firestore()
              .collection("exercise")
              .get().then((querySnapshot) => {

               
             querySnapshot.forEach((element) => {
                
               data.push(element.data())
       
               
              })
        
             Excercise.create({data: data})
              
          })
        }
        
        
    },
    getters:{


    },
    mutations:{
        
    }
    
}