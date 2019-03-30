import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  person = {
    img: '1',
    name: '2',
    sex: '3',
    id: 0,
    school: '4',
    major: '5',
    hobby: '6'
  };

  edit = false;

  icon = 'create';

  constructor() {}

  clickIcon(e) {
    console.log(1);
    this.edit = !this.edit;

    if (this.edit) {
      this.icon = 'save';
    } else {
      this.icon = 'create';
    }
  }
}
