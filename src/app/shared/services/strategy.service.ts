import { Injectable } from '@angular/core';
import {Strategy} from '../models/Strategy'

@Injectable()
export class StrategyService {

  constructor() { }

  public getStraddle(ticker) {
    
    var strategy = new Strategy()
    strategy.name = "Straddle"
    strategy.ticker = ticker

    return strategy;
  }

}
