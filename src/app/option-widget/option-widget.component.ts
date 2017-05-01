import { Input, Component, OnInit, SimpleChanges  } from '@angular/core';
import { OptionStrategy} from '../shared/models/option-strategy'
import { Option} from '../shared/models/option'
import {GridOptions} from 'ag-grid'
import _ from "lodash";

@Component({
  selector: 'app-option-widget',
  templateUrl: './option-widget.component.html',
  styleUrls: ['./option-widget.component.css']
})
export class OptionWidgetComponent  implements OnInit {
  
    ngOnInit() {
     this.initGrid()
     console.log(this.gridOptions.api)
    }

  gridOptions: GridOptions;
  rowData :null; 
  footerData: object; 
  @Input() strategy : OptionStrategy ;

  constructor() {
        
  }
  

  decimalRenderer(value){

  }

  initGrid() {
        this.gridOptions = { 
            rowHeight : 18,
            floatingBottomRowData: []
          }
        this.gridOptions.columnDefs = [
             
                        {headerName: 'Expiry', field: 'expiry', width: 70, floatingCellRenderer: function(params) { return 'Net'}},                          {
                        headerName: 'B/S', field: 'isShort', width: 45},
                        {headerName: 'QTY', field: 'quantity', width: 45},
                        {headerName: 'Strike', field: 'strike', width: 45},
                        {headerName: 'CallPut', field: 'isCall', width: 55},
                        {headerName: 'Price', field: 'price', width: 55, cellRenderer: function(params) { return params.value.toPrecision(2)}}
                    ]
              
    }
    
 ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['strategy']) {
            // this.initGrid()

              this.rowData =   _.map(this.strategy.legs, function(t){
                    var row = {
                      expiry: t.option.expiry,
                      isShort: t.isShort,
                      quantity: t.quantity,
                      strike: t.option.strike,
                      callPut: t.option.isCall,
                      price : t.option.mid
                    }
                    return row;
                });

              this.footerData =   [{price: this.strategy.totalPrice}]
                       
           
          //  this.footerData.price = 100 
            

        }
    }

}
