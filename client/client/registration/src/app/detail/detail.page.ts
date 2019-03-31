import { DataService } from './../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {

  post = {};

  joiner: [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.getPostById(id).subscribe(it => {
      console.log(it);
      this.post = it;

      this.joiner = it.joinList[0];
    });
  }

}
