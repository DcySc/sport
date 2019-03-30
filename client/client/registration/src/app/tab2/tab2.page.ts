import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectTab = 1;
  messageList = [{
    img: '1',
    name: '2',
    sex: '男',
    id: 0,
    school: '上师大',
    major: '计算机',
    hobby: '篮球',
    content: '撒圣诞节暗红色的还是的哈卡仕号是看得见哈健康对话框就啊哈收到货卡机何时可掇家会',
    isShow: true
  }, {
    img: '1',
    name: '2',
    sex: '女',
    id: 0,
    school: '交大',
    major: '心理',
    hobby: '足球',
    content: '撒圣诞节暗红色的还是的哈卡仕是看得见哈健康哈收到货卡机何时可掇家会',
    isShow: true
  }];

  constructor() {

  }


  changeTab(num) {
    this.selectTab = num;
  }
}
