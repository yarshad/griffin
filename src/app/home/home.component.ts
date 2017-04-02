import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map'
import {GridOptions} from 'ag-grid'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private gridOptions: GridOptions;
    optionChain = {};
    ticker = null;
    constructor(private _http: Http) {

        this.gridOptions = {}

 this.gridOptions.columnDefs = [
            {
                headerName: "ID",
                field: "id",
                width: 100
            },
            {
                headerName: "Value",
                field: "value",
                // cellRendererFramework: RedComponentComponent,
                width: 100
            },

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
      this.getOptionChain().subscribe(optionData =>{
              console.log(optionData);
              this.ticker = optionData.symbol;
              this.optionChain = optionData
      });
    } 
}
