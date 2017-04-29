
import {Option} from './option'
import{Trade} from './trade'

export class OptionStrategy{

   public name: string
   public ticker: string
   public spot: number
   public legs: Trade[]
}