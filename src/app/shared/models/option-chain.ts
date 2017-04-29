
import {Option} from './option'

export class OptionChain {
     ticker: string
     spot: number
     timestamp: string
     calls: Option[] 
     puts: Option[] 
 
 constructor(ticker, spot, timestamp, calls,puts){
     this.ticker = ticker
     this.spot = spot
     this.timestamp = timestamp
     this.calls = calls
     this.puts = puts
 }

}

