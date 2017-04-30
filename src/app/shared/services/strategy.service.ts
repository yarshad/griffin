import { Injectable } from '@angular/core';
import {OptionStrategy} from '../models/option-strategy'
import {OptionChain} from  '../models/option-chain'
import {Option} from '../models/option'

import {Trade} from  '../models/trade'
import _ from "lodash";

@Injectable()
export class StrategyService {

  constructor() { }

  public getStraddle(optionChain : OptionChain) {
    
    var strategy = new OptionStrategy()
    strategy.name = "Straddle"
    strategy.ticker = optionChain.ticker
    strategy.spot = optionChain.spot
    strategy.atmStrike = optionChain.atmStrike


    var call : Option = _.find(optionChain.calls, function(c){
      return c.strike == strategy.atmStrike
    })


    var put = _.find(optionChain.puts, function(c){
      return c.strike == strategy.atmStrike
    })

    var td1 = new Trade(-1,true, call)
    var td2 = new Trade(-1,true, put)
    
    strategy.legs = [td1, td2]
    strategy.totalPrice = (td1.quantity * (td1.option.bid + td1.option.ask)/2)  + (td2.quantity * (td2.option.bid + td2.option.ask)/2 )

    return strategy;
  }  
}
