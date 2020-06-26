import {Model} from '@vuex-orm/core'


export default class Excercise extends Model{

    static entity = 'excercises'

    
   

    static fields(){
        return{
            id: this.attr(null),
            title : this.attr(null),
            video: this.attr(null),
            desc: this.attr(null),
            group:this.attr(null),


        }
    }
}