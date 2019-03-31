module.exports = class User {
  constructor({
    id,
    sex,
    name,
    bornDate,
    school,
    major,
    department,
    img,
    password,
    hobby
  }) {
    this.id = id;
    this.sex = sex;
    this.name = name;
    this.bornDate = bornDate;
    this.school = school; 
    this.department = department;
    this.major = major;
    this.img = img;
    this.password = password;
    this.hobby = hobby;
  }
}