import { Input, Component, OnInit, SimpleChanges  } from '@angular/core';
import { OptionChain} from '../shared/models/option-chain'

@Component({
  selector: 'app-option-widget',
  templateUrl: './option-widget.component.html',
  styleUrls: ['./option-widget.component.css']
})
export class OptionWidgetComponent  {

  @Input() optionChain : OptionChain ;
  @Input() title : string;

  constructor() {
        
    }

 ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['optionChain']) {
            console.log(this.optionChain.ticker)
        }
    }

}
