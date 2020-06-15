import {Model} from '@vuex-orm/core'


export default class MealPlans extends Model{

    static entity = 'mealplans'

    
   

    static fields(){
        return{
            id : this.attr(null),
            calories : this.attr(null),
            protein : this.attr(null),
            fat : this.attr(null),
            carbohydrates: this.attr(null),
            meal1: this.attr(null),
            meal2: this.attr(null),
            meal3: this.attr(null),
            name: this.attr(null),



            


        }
    }
}