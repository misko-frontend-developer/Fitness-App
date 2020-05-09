
import db from '../firebase/firebaseInit'

export default {


    state:{

      latestId :null

    },
    getters:{
      getId: state => state.latestId,
    },
    mutations:{
      
    setId: (state, id) => (state.latestId = id),


    },
        actions :{ 
 
             async collectId({commit}) {

                console.log('arrayID')
                let arrayID = [];
                await db.firestore().collection("users").orderBy('user_id').limit(10000).get()
                  .then(querySnapshot => {
            
                    querySnapshot.forEach(doc => {
                      arrayID.push(doc.data())
                        
                      
                    })

                  })

                  let orderIt = arrayID.sort((a, b) => (a.user_id - b.user_id));
                  let lastId = parseInt(orderIt[orderIt.length - 1].user_id) + 1;
                  commit("setId", lastId)
                
                      
        
                }
            }
        

}

    








   /*async getUsers({dispatch}){
        let data = []
        let d = await db.firestore().collection('users').get();
        d.forEach( doc =>{
            let filterData = doc.data();
            data.push(filterData)
        })
    

        dispatch('insert', data )

    },
  
    
} */


