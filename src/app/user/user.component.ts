import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { Theme } from './theme';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

 public user: User;

  public genders = [
    { value: 'F', display: 'Female' },
    { value: 'M', display: 'Male' }
  ];
  public roles = [
    { value: 'admin', display: 'Administrator' },
    { value: 'guest', display: 'Guest' },
    { value: 'custom', display: 'Custom' }
  ]

  public themes: Theme[] = [
    { backgroundColor: 'black', fontColor: 'white', display: 'Dark' },
    { backgroundColor: 'white', fontColor: 'black', display: 'Light' },
    { backgroundColor: 'grey', fontColor: 'white', display: 'Sleek' }
  ];

  public topics = [
    { value: 'game', display: 'Gaming' },
    { value: 'tech', display: 'Technology' },
    { value: 'life', display: 'Lifestyle' },
  ];

  public toggles = [
    { value: 'toggled', display: 'Toggled' },
    { value: 'untoggled', display: 'UnToggled' },
  ];

  public t = {
    true: { value: 'toggled', display: 'Toggled' },
    false: { value: 'untoggled', display: 'UnToggled' }
  }
   

  ngOnInit() {

  this.user = {
      name: '',
      gender: this.genders[0].value,
      role: null,
      theme: this.themes[0],
      isActive: false,
      toggle: this.toggles[1].value,
      topics: [this.topics[1].value]
    }}

    save(isValid: boolean, f: User) {
    if (!isValid) return;
    console.log(f);
  }

}
