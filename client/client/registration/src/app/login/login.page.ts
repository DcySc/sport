import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  backgrounds: string[] = ['http://www.jituwang.com/uploads/allimg/130420/260365-13042016104045.jpg'];
  loginVM = { code: '150154055', password: '123456'};
  constructor(public router: Router, private auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLoggedin() {
    this.auth.getToken({ id: this.loginVM.code, password: this.loginVM.password }).subscribe(
      it => {
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigateByUrl('tabs');
      }
    );
  }

  // nav(page) {
  //   this.navCtrl.push(page);
  // }
}
