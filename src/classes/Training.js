import {Model} from '@vuex-orm/core'
import User from '../classes/User'

export default class Training extends Model{

    static entity = 'trainings'

    

    static fields(){
        return{

     
            id:this.attr(null),
            name : this.attr(null),
            color: this.attr(null),
            start: this.attr(null),
            end: this.attr(null),
            details : this.attr(null),


            user: this.belongsTo(User,'user_id')
          


        }
    }
}