import {Model} from '@vuex-orm/core'

import Training from '../classes/Training'
export default class User extends Model{

    static entity = 'users'

    
   

    static fields(){
        return{
            user_id : this.attr(null),
            name : this.attr(null),
            email: this.attr(null),
            gender: this.attr(null),

            trainings: this.hasMany(Training, 'id')

        }
    }
}