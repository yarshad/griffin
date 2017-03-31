import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    optionChain;
    ticker = null;
    constructor(private _http: Http) {}

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

 title = 'Welcome to Griffin!';
}
