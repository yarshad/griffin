import { Injectable } from '@angular/core';
import {OptionStrategy} from '../models/option-strategy'
import {OptionChain} from  '../models/option-chain'
import {Trade} from  '../models/trade'


@Injectable()
export class StrategyService {

  constructor() { }

  public getStraddle(optionChain : OptionChain) {
    
    var strategy = new OptionStrategy()
    strategy.name = "Straddle"
    strategy.ticker = optionChain.ticker
    strategy.spot = optionChain.spot
    

    var td1 = new Trade(-1,true,optionChain.calls[0])
    var td2 = new Trade(1,false,optionChain.puts[20])
    
    strategy.legs = [td1, td2]

    return strategy;
  }

}
