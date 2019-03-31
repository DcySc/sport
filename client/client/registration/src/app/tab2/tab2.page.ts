import { DataService } from './../shared/services/data.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectTab = 1;
  messageList = [];
  joinList = [];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {

  }

  clickItem(id) {
    this.router.navigate(['/detail', id]);
  }


  changeTab(num) {
    this.selectTab = num;
  }

  clickIcon(e) {
    this.router.navigate(['/addpost']);
  }

  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('vm'));
    this.dataService.getUserPosts(user.id).subscribe(it => {
      console.log(it);
      this.messageList = it;
    });
    this.dataService.getJoinPosts(user.id).subscribe(it => this.joinList = it);
  }
}
