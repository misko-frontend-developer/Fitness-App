import {Model} from '@vuex-orm/core'


export default class Intensity extends Model{

    static entity = 'intensity'

    
   

    static fields(){
        return{
            id: this.attr(null),
            sets : this.attr(null),
            reps: this.attr(null),
            name: this.attr(null),
            color: this.attr(null),
            break: this.attr(null)


        }
    }
}