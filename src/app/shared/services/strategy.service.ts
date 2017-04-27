import { Injectable } from '@angular/core';
import {OptionStrategy} from '../models/option-strategy'
import {OptionChain} from  '../models/option-chain'

@Injectable()
export class StrategyService {

  constructor() { }

  public getStraddle(optionChain : OptionChain) {
    
    var strategy = new OptionStrategy()
    strategy.name = "Straddle"
    strategy.ticker = optionChain.ticker
    strategy.spot = optionChain.spot

    strategy.leg1 = optionChain.calls[0]
    return strategy;
  }

}
