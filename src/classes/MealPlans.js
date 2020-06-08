import {Model} from '@vuex-orm/core'


export default class MealPlans extends Model{

    static entity = 'mealplans'

    
   

    static fields(){
        return{
            id : this.attr(null),
            title : this.attr(null),
            


        }
    }
}