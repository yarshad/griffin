import {Option} from './option'

export class Trade  {

    quantity: number
    isShort: boolean
    option: Option
    
    constructor(quantity : number, isShort : boolean, option : Option){
        this.quantity = quantity
        this.isShort = isShort
        this.option = option
    }    
}