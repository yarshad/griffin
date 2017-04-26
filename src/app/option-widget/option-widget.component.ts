import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-widget',
  templateUrl: './option-widget.component.html',
  styleUrls: ['./option-widget.component.css']
})
export class OptionWidgetComponent  {

  @Input() title:string;
  

}
