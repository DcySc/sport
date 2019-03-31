import { DataService } from './../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user;

  placeSelect: any = {
    header: '地区'
  };

  schoolSelect: any = {
    header: '学校'
  };

  noneSelect: any = {
    header: '学校'
  };

  place: '';
  school: '';

  curList = [];

  messageList = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {

  }

  clickIcon(e, item) {
    item.isShow = !item.isShow;
  }

  clickCheckBox(id, post) {
    if (this.user.id === id || post.joinList.includes(this.user.id)) {
      this.router.navigate(['/detail', post.id]);
    } else {
      post.joinList.push(this.user.id);
      post.user = post.user[0].id;

      this.dataService.updatePost(post).subscribe(it => {
        this.router.navigate(['/detail', post.id]);
      });
    }
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('vm'));
    this.dataService.getPosts().subscribe(it => {
      this.messageList = it;
      this.curList = it;
      console.log(it);
    });
  }
}
