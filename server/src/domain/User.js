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
    password
  }) {
    this.id = id;
    this.sex = sex;
    this.name = name;
    this.bornDate = bornDate;
    this.school = school; // 职称
    this.department = department;
    this.major = major; // 科室
    this.img = img;
    this.password = password;
  }
}