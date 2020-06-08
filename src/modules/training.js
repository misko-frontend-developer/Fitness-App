import db from "../firebase/firebaseInit";
import Training from "../classes/Training"
export default {

    state:{
        tranings:null

    },
    actions:{   

      async getTrainings() {
       
           let data = [];
          await db
              .firestore()
              .collection("training")
              .get().then((querySnapshot) => {
              querySnapshot.forEach((element) => {
                
               data.push(element.data())
               console.log("Training plans:" + element)
               
              })

              Training.create({data: data})
              
          })
        }
        
        
    },
    getters:{


    },
    mutations:{
        
    }
    
}