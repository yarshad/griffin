import { Injectable } from '@angular/core';
import {OptionStrategy} from '../models/option-strategy'

@Injectable()
export class StrategyService {

  constructor() { }

  public getStraddle(ticker, spot) {
    
    var strategy = new OptionStrategy()
    strategy.name = "Straddle"
    strategy.ticker = ticker
    strategy.spot = spot

    return strategy;
  }

}
