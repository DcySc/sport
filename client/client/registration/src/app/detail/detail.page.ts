import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  post = {
    name: 'asda',
    time: '2019/3/2 14:00',
    address: '上师大东门',
    message: '师大会受到哈苏东海USDhi阿湖湿地',
    joiner: [{
      name: 'sdasdas',
      sex: '男',
      hobby: '篮球'
    },{
      name: 'sadas',
      sex: '男',
      hobby: '足球'
    },{
      name: 'saddfsdf',
      sex: '女',
      hobby: '篮球'
    }]
  };

  constructor() { }

  ngOnInit() {
  }

}
