
class Person {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }

  getUserDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }

}

var p = new Person('Andy', 25);

console.log(p.getUserDescription());
