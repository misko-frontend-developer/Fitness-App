import db from "../firebase/firebaseInit";
import Intensity from "../classes/Intensity"
export default {

    state:{
        tranings:null

    },
    actions:{   

      async getIntensity() {
      
           let data = [];
          await db
              .firestore()
              .collection("intensity")
              .get().then((querySnapshot) => {

               
             querySnapshot.forEach((element) => {
                
               data.push(element.data())
       
               
              })
        
              Intensity.create({data: data})
              
          })
        }
        
        
    },
    getters:{


    },
    mutations:{
        
    }
    
}