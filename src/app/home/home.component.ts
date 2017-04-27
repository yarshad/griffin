import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map'
import {GridOptions} from 'ag-grid'
import { OptionChain} from '../shared/models/option-chain'
import { Option} from '../shared/models/option'
import _ from "lodash";
import {TradierService} from '../shared/services/tradier.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    gridOptions: GridOptions;

    ticker: string = 'SPY'
    optionChain : OptionChain = new OptionChain()
    expirations = []
    data = []
    selectedExpiry : number  
    baseUrl : string = 'http://griffin-api.herokuapp.com/'
    // baseUrl : string = 'http://localhost:9000/'

    constructor(private _http: Http, td: TradierService) {
        this.initGrid()
        this.searchTicker()
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

    addStrategy(){
        console.log("Adding strategy")
        this.data.push(1)

    }

searchTicker(){
        var url = this.baseUrl + 'quotes/' + this.ticker
        var result = this._http.get(url).map((response: Response) => response.json())       
        result.subscribe(response =>{ this.processResponse(response)})
     }

expirySelected(expiry){
      
    var url = this.baseUrl  + "options/" + this.ticker + "/" + expiry
    var result = this._http.get(url).map((response: Response) => response.json());
    result.subscribe(response => {this.processResponse(response)})
    }
   
   
    processResponse(response){

           console.log(response)
           this.expirations = response.expirations
           this.optionChain.ticker = response.symbol
           this.optionChain.spot = response.spot
           this.optionChain.timestamp = response.asOfDate
            var calls =  _.map(response.calls,function(d){

                  var call : Option = {
                    key : d.optionSymbol,
                    expiry: d.expiry,
                    bid: d.bid,
                    price : d.lastPrice,
                    ask : d.ask,
                    volume : d.volume,
                    openInterest : d.openInterest,
                    strike: d.strike,
                    isCall: true
                  }

                return call;
                  
             });

            this.optionChain.calls = calls

             var puts = _.map(response.puts,function(d){

                  var put : Option = {
                    key : d.optionSymbol,
                    expiry: d.expiry,
                    bid: d.bid,
                    price : d.lastPrice,
                    ask : d.ask,
                    volume : d.volume,
                    openInterest : d.openInterest,
                    strike: d.strike,
                    isCall: true
                  }

                    return put;
             });
 
                this.optionChain.puts = puts;
                
                // console.log(this.optionChain)

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
