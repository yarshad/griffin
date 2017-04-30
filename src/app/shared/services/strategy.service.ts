import { Injectable } from '@angular/core';
import {OptionStrategy} from '../models/option-strategy'
import {OptionChain} from  '../models/option-chain'
import {Option} from '../models/option'

import {Trade} from  '../models/trade'
import _ from "lodash";

@Injectable()
export class StrategyService {

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

  public getStrangle(optionChain : OptionChain) {
    
    var strategy = new OptionStrategy()
    strategy.name = "Straddle"
    strategy.ticker = optionChain.ticker
    strategy.spot = optionChain.spot
    strategy.atmStrike = optionChain.atmStrike

    var call : Option = _.chain(optionChain.calls)
              .filter(c => c.strike > optionChain.spot).head().value()
            
    
    var put : Option = _.chain(optionChain.puts)
              .filter(c => c.strike < optionChain.spot).last().value()
    
    
    var td1 = new Trade(-1,true, call)
    var td2 = new Trade(-1,true, put)
    
    strategy.legs = [td1, td2]
    strategy.totalPrice = (td1.quantity * (td1.option.bid + td1.option.ask)/2)  + (td2.quantity * (td2.option.bid + td2.option.ask)/2 )

    return strategy;
  }  

  public getIronCondor(optionChain : OptionChain) {
    
    var strategy = new OptionStrategy()
    strategy.name = "Iron Condor"
    strategy.ticker = optionChain.ticker
    strategy.spot = optionChain.spot
    strategy.atmStrike = optionChain.atmStrike

    
    var longPut  : Option = _.chain(optionChain.puts).filter(c => c.strike < optionChain.spot).initial().last().value()
    var shortPut : Option = _.chain(optionChain.puts).filter(c => c.strike < optionChain.spot).last().value()    
    var shortCall : Option = _.chain(optionChain.calls).filter(c => c.strike > optionChain.spot).head().value()
    var longCall : Option = _.chain(optionChain.calls).filter(c => c.strike > optionChain.spot).tail().head().value()

    var td0 = new Trade(1,false, longPut)
    var td1 = new Trade(-1,true, shortPut)
    var td2 = new Trade(-1,true, shortCall)
    var td3 = new Trade(1,false, longCall)
    
    strategy.legs = [td0, td1, td2, td3]
    strategy.totalPrice = _.chain(strategy.legs).map(t => t.quantity * (t.option.bid + t.option.ask)/2).sum().value()

    return strategy;
  }  
}
