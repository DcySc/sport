import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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

  messageList = [{
    img: '1',
    name: '2',
    sex: '3',
    id: 0,
    school: '4',
    major: '5',
    hobby: '6',
    content: '撒圣诞节暗红色的还是的哈卡仕达as接电话卡接收到卡号是看得见哈健康对话框就啊哈收到货卡机何时可掇家会',
    isShow: true
  }, {
    img: '1',
    name: '2',
    sex: '3',
    id: 0,
    school: '4',
    major: '5',
    hobby: '6',
    content: '撒圣诞节暗红色的还是的哈卡仕达as接电话卡接收到卡号是看得见哈健康对话框就啊哈收到货卡机何时可掇家会',
    isShow: true
  }];

  constructor() {

  }

  clickIcon(e, item) {
    item.isShow = !item.isShow;
  }
}
