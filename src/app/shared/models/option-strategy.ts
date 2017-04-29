
import {Option} from './option'
import{Trade} from './trade'

export class OptionStrategy{

   name: string
   ticker: string
   spot: number
   atmStrike: number
   legs: Trade[]
   totalPrice: number
}