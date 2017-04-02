import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map'
import {GridOptions} from 'ag-grid'
import { OptionChain} from '../shared/models/option-chain'
import { Option} from '../shared/models/option'
import _ from "lodash";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private gridOptions: GridOptions;

    optionChain : OptionChain = new OptionChain()
    expirations = []
        
    constructor(private _http: Http) {

        // console.log(this.optionChain)
    
        this.gridOptions = { enableSorting: true, rowHeight : 18}

 this.gridOptions.columnDefs = [
             
             {headerName: 'Expiry', field: 'Expiry', width: 80}, 
  {
        headerName: "CALLS",
        children: [
            // {headerName: 'Option', field: 'cKey', width: 150},
            {headerName: 'Bid', field: 'cBid', width: 50},
            {headerName: 'Last', field: 'cPrice', width: 50},
            {headerName: 'Ask', field: 'cAsk', width: 50},
            {headerName: 'Vol', field: 'cVol', width: 50},
            {headerName: 'Open Int', field: 'cOpenInterest', width: 65}
        ]
  },
    {headerName: 'Strike', field: 'Strike', width: 75}, 
  {
        headerName: "PUTS",
        children: [
            // {headerName: 'Option', field: 'pKey', width: 150},
            {headerName: 'Bid', field: 'pBid', width: 50},
            {headerName: 'Last', field: 'pPrice', width: 50},
            {headerName: 'Ask', field: 'pAsk', width: 50},
            {headerName: 'Vol', field: 'pVol', width: 50},
            {headerName: 'Open Int', field: 'pOpenInterest', width: 65}
        ]
  }

        ];
        this.gridOptions.rowData = [
            {id: 5, value: 10},
            {id: 10, value: 15},
            {id: 15, value: 20}
        ]
    }

    getOptionChain(){
        var url = 'http://griffin-api.herokuapp.com/quotes/AAPL'
        return this._http.get(url).map((response: Response) => response.json());
                
    }

    ngOnInit() {
      this.getOptionChain().subscribe(response =>{
              
           this.expirations = response.expirations
           this.optionChain.ticker = response.symbol
           
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
      });
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
                  options.push(call);
             });


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
          });

         this.gridOptions.api.setRowData(options);
    } 
}
