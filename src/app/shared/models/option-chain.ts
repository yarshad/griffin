import _ from "lodash";
import {Option} from './option'

export class OptionChain {
     ticker: string
     spot: number
     atmStrike : number
     timestamp: string
     calls: Option[] 
     puts: Option[] 

 
 constructor(ticker, spot, timestamp, calls,puts){
     this.ticker = ticker
     this.spot = spot
     this.timestamp = timestamp
     this.calls = calls
     this.puts = puts

     this.getAtmStrike()
 }

    getAtmStrike(){
        var strikes = _.map(this.calls, 'strike').filter(i => i < this.spot).reverse()
        this.atmStrike = strikes[0]                   
    }
}

