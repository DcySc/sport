import { DataService } from './../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  user = null;

  post = {
    title:  '',
    details:  '',
    date:  '',
    user:  '',
    beginDate:  '',
    address:  '',
    joinList: []
  };

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('vm'));
    this.post.user = this.user.id;
  }

  clickFooter() {
    this.post.date = new Date().toJSON();
    this.post.title = this.post.address;

    this.dataService.addPost(this.post).subscribe(val => this.router.navigate(['/tabs']));

    
  }

}
