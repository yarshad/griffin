import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map'
import {GridOptions} from 'ag-grid'
import { OptionChain} from '../shared/models/option-chain'
import { Option} from '../shared/models/option'
import _ from "lodash";
import {OptionStrategy} from '../shared/models/option-strategy'
import {StrategyService} from '../shared/services/strategy.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    strategyService : StrategyService
    gridOptions: GridOptions;
    ticker: string = 'SPY'
    optionChain : OptionChain 
    expirations = []
    strategyList = ['', 'Strangle', 'Straddle', 'Iron Condor']
    strategies = []
    // selectedStrategy: String
    selectedExpiry : number  
    baseUrl : string = 'http://griffin-api.herokuapp.com/'
    // baseUrl : string = 'http://localhost:9000/'

    constructor(private _http: Http, ss: StrategyService) {
        this.initGrid()
        this.searchTicker()
        this.strategyService = ss
    }

    initGrid() {
        this.gridOptions = { enableSorting: true, rowHeight : 18}
        this.gridOptions.columnDefs = [
            
             {headerName: 'Expiry', field: 'Expiry', width: 80}, 
            {
                    headerName: "CALLS",
                    children: [
                        // {headerName: 'Option', field: 'cKey', width: 150},
                        {headerName: 'Bid', field: 'cBid', width: 45},
                        {headerName: 'Last', field: 'cPrice', width: 45},
                        {headerName: 'Ask', field: 'cAsk', width: 45},
                        {headerName: 'Vol', field: 'cVol', width: 45},
                        {headerName: 'Open Int', field: 'cOpenInterest', width: 55}
                    ]
            },
                {headerName: 'Strike', field: 'Strike', width: 50}, 
            {
                    headerName: "PUTS",
                    children: [
                        // {headerName: 'Option', field: 'pKey', width: 150},
                        {headerName: 'Bid', field: 'pBid', width: 45},
                        {headerName: 'Last', field: 'pPrice', width: 45},
                        {headerName: 'Ask', field: 'pAsk', width: 45},
                        {headerName: 'Vol', field: 'pVol', width: 45},
                        {headerName: 'Open Int', field: 'pOpenInterest', width: 55}
                    ]
            }];
    }

    ngOnInit() {
     
    }

    addStrategy(stg){

    console.log("Adding " + stg)
    
    switch(stg) { 

    case 'Strangle': { 
        var strategy = this.strategyService.getStrangle(this.optionChain)
        this.strategies.unshift(strategy) 
        break; 
    } 
    case 'Straddle': { 
        var strategy = this.strategyService.getStraddle(this.optionChain)
        this.strategies.unshift(strategy) 
        break; 
    } 

    case 'Iron Condor': { 
            var strategy = this.strategyService.getIronCondor(this.optionChain)
            this.strategies.unshift(strategy) 
            break;    
        } 
            }
    }

searchTicker(){
        var url = this.baseUrl + 'quotes/' + this.ticker
        var result = this._http.get(url).map((response: Response) => response.json())       
        result.subscribe(response =>{ this.processResponse(response)})
     }

expirySelected(expiry){
         
    var url = this.baseUrl  + "options/" + this.ticker + "/" + expiry
    console.log(url)
    var result = this._http.get(url).map((response: Response) => response.json());
    result.subscribe(response => {this.processResponse(response)})
    }
   
   
    processResponse(response){         
        //    console.log(response)
           this.expirations = response.expirations
           this.selectedExpiry = response.calls[0].expiry

           var calls =  _.map(response.calls,function(d){

                  var call : Option = {
                    key : d.optionSymbol,
                    expiry: d.expiry,
                    bid: d.bid,
                    mid: (d.bid + d.ask) / 2,
                    price : d.lastPrice,
                    ask : d.ask,
                    volume : d.volume,
                    openInterest : d.openInterest,
                    strike: d.strike,
                    isCall: true
                  }

                return call;
                  
             });

            
            // this.optionChain.calls = calls

             var puts = _.map(response.puts,function(d){

                  var put : Option = {
                    key : d.optionSymbol,
                    expiry: d.expiry,
                    bid: d.bid,
                    mid: (d.bid + d.ask) / 2,
                    price : d.lastPrice,
                    ask : d.ask,
                    volume : d.volume,
                    openInterest : d.openInterest,
                    strike: d.strike,
                    isCall: false
                  }

                    return put;
             });
 
                this.optionChain = new OptionChain(response.symbol,response.spot, response.asOfDate,calls,puts)
                this.updateGrid()  

    }
    updateGrid(){

            var input = this.optionChain
            var options = []

              _.each(input.calls,function(d){
                  var call = {
                    cKey : d.optionSymbol,
                    Expiry: d.expiry,
                    cBid: d.bid,
                    cPrice : d.price,
                    cAsk : d.ask,
                    cVol : d.volume,
                    cOpenInterest : d.openInterest,
                    Strike: d.strike

                  }
                  options.push(call)
             })

          _.map(options, function(o){
              var put = _.find(input.puts, function(f){
                return o.Strike === f.strike
              })
              
              if(put){
                  o.pKey = put.optionSymbol,
                  o.pBid = put.bid,
                  o.pPrice = put.price,
                  o.pAsk = put.ask,
                  o.pVol = put.volume,
                  o.pOpenInterest = put.openInterest                  
              }
          })

         this.gridOptions.api.setRowData(options)
    } 

}
