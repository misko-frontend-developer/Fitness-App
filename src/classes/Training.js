import {Model} from '@vuex-orm/core'


export default class Training extends Model{

    static entity = 'trainings'

    

    static fields(){
        return{

          /*   name : this.attr(null),
            details : this.attr(null),
            start : this.attr(null),
            end : this.attr(null),
            color : this.attr(null),
            test : this.attr(null)*/
            id:this.attr(null),
            name : this.attr(null),
            details : this.attr(null),
            user_id: this.attr(null),
            color: this.attr(null),
            start: this.attr(null),
            end: this.attr(null),
          


        }
    }
}