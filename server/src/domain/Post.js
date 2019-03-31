/**
 * post属性
 */
module.exports = class Post{
  // jionList(参与者列表) user发起者id
  constructor({id,title,details,date,joinList,user,beginDate,address}){
    this.id = id;
    this.title = title;
    this.details = details;
    this.date = date;
    this.joinList = joinList;
    this.user = user;
    this.beginDate = beginDate;
    this.address = address;
  }
}