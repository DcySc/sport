import { AuthService } from './../shared/services/auth.service';
import { DataService } from './../shared/services/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  person = {
    bornDate: '',
    department: '',
    hobby: '',
    id: '',
    img: '',
    major: '',
    name: '',
    school: '',
    sex: ''
  };

  edit = false;

  icon = 'create';

  constructor(
    private authService: AuthService
  ) {}

  clickIcon(e) {
    console.log(1);
    this.edit = !this.edit;

    if (this.edit) {
      this.icon = 'save';
    } else {
      this.icon = 'create';
      this.authService.updateUser(this.person).subscribe();
    }
  }

  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('vm'));
    this.authService.getUserById(user.id).subscribe(it => {
      this.person = it[0];
      console.log(it);
    });
  }
}
