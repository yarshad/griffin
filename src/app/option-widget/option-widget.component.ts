import { Input, Component, OnInit, SimpleChanges  } from '@angular/core';
import { OptionStrategy} from '../shared/models/option-strategy'

@Component({
  selector: 'app-option-widget',
  templateUrl: './option-widget.component.html',
  styleUrls: ['./option-widget.component.css']
})
export class OptionWidgetComponent  {

  @Input() strategy : OptionStrategy ;

  constructor() {
        
    }

 ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['strategy']) {
            // console.log(this.strategy.legs)
        }
    }

}
