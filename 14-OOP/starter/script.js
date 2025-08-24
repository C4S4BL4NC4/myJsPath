'use strict';

// Constructor Functions: Always start with Capital letter. Arrow functions don't work in construction function because it does not have "this" keyword.
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Never do this create a method inside constructor function because when you have a lot of instances you'd be making 1000 copies of that function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
};
*/

/*
const jonas = new Person('Jonas', 1991);
//console.log(jonas);

const donna = new Person('Donna', 1999);
console.log(donna);
*/

//const jo = 'Jo';
//console.log(jo instanceof Person);
//console.log(jonas instanceof Person);

// When calling function using 'new'
// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

// Prototypes: every object ships with Prototype property that itself is an object so it also has a prototype within it. This is called Porottype chaining the chain breaks when protottype tree ends with a null. Adding methods to the prototype object is better that adding them within the constructor function for you only add them once. And you have access directly to them methods inside of the prototype because of prototypal inheretence. "donna.clacAge();"
/*
Person.prototype.clacAge = function () {
  console.log(2025 - this.birthYear);
};

donna.clacAge();
console.log(Person.prototype);
console.log(jonas.__proto__);

// __proto__ of an instance = constructor prototype
console.log(jonas.__proto__ === Person.prototype);

const argy = { name: 'Argy', year: 2024 };
console.log(argy);

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species); // Homo Sapiens
console.log(jonas.hasOwnProperty('birthYear')); // true
console.log(jonas.hasOwnProperty('species')); // false
console.log(jonas.__proto__.hasOwnProperty('species')); // true
console.log(Person.hasOwnProperty('species')); // false
console.log(Person.prototype.hasOwnProperty('species')); //true. For the class itself use .prototype and for an instance use .__proto__

// Prototypal Inheritance

// Object.prototype (top of prototype chain)
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]; // new Array === []
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};
// Do not extend functionality on built-in objects
console.log(arr.unique);

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

/*
console.log('---------CHALLENGE #1-------');

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed = this.speed + 10;
  return console.log(`${this.make} increased to ${this.speed}`);
};
Car.prototype.brake = function () {
  this.speed = this.speed - 5;
  return console.log(`${this.make} decreased to ${this.speed}`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.brake();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.brake();
*/

// ES6 Classes: Nicer and modern syntax

// Class Expression
// const Cars = class {};

// Class Declaration

/*

class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2025 - this.birthYear);
  }

  get age() {
    return 2025 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) {
      this._fullName = name; // Convention
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new Person('Jessica Davis', 2000);

console.log(jessica);

const walter = new Person('Walter White', 1959);
console.log(walter);

*/

// 1. Classes are NOT hoisted (can't be used before declaration).
// 2. Classes are first-class citizens (Pass them and return them from and to function (They are functions BTS)).
// 3. Classes are executed in strict mode.

// Constuctor functions and ES6 classes are a matter of personal preference. Also they hide the true nature of the prototype and protoypal inheritance.

/*
// Setters and Getters
const account = {
  owner: 'jonas',
  movements: [200, 400, -100],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // As a getter (calling it as a property (not a method))
account.latest = 50; // Setter
console.log(account.latest);

*/

// Static Methods are methods that are part of the constructor not the instances of a class ex Number.parseFloat() not 1.parseFloat()
/*
class Car {
  constructor(make, year) {
    this.make = make;
    this.year = year;
  }
  static country() {
    console.log('Japan');
    console.log(this);
  }
}

const honda = new Car('Honda', 1996);

// honda.country(); // Error
Car.country(); // Japan

*/

// Object.create
/*
const PersonProto = {
  calcAge() {
    console.log(2025 - this.birthYear);
  },

  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const steve = Object.create(PersonProto);
steve.name = 'Steve';
steve.birthYear = 2011;
steve.calcAge();

const sofi = Object.create(PersonProto);
sofi.init('Sofi', 1997);
sofi.calcAge();

*/

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    return console.log(`${this.make} increased to ${this.speed}`);
  }

  brake() {
    this.speed -= 5;
    return console.log(`${this.make} decreased to ${this.speed}`);
  }

  get speedUS() {
    // To dynamically calculate the speed + calling it as a property of a class instead of a method
    return `${this.make} is crusing at ${this.speed / 1.6} mph`;
  }

  set speedUS(spd) {
    // Backwards property kind of we are setting the SpeedUS and the input is dealt with sepereately and manipulated as if it was a true property.
    const newSpd = spd * 1.6;
    console.log(`Current Speed is ${newSpd} kmh`);
    return (this.speed = newSpd);
  }
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.brake();
bmw.accelerate();
console.log(bmw.speedUS);
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
console.log(mercedes.speedUS);

bmw.speedUS = 100;
*/

// Inheritance of Constructor functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2025 - this.birthYear);
// };

// const Student = function (firstName, birthYear, major) {
//   /*
//   this.firstName = firstName; // Duped Code from Person
//   this.birthYear = birthYear; // Duped Code from Person
//   */

//   Person.call(this, firstName, birthYear);
//   this.major = major;
// };

// Student.prototype = Object.create(Person.prototype);
// // Making Student's proto same as the Parent class of Person. Must be before any methods we wanna add to the class because Object.create() empties the object and recreate it.

// Student.prototype.introduce = function () {
//   console.log(`Hi, my name is ${this.firstName}. I major in ${this.major}.`);
// };

// const tim = new Student('Tim', 2000, 'Electrical Engineering');
// tim.introduce();

// console.log(tim.__proto__);

// console.dir(Student.prototype.constructor);

// Student.prototype.constructor = Student;

// console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed = this.speed + 10;
//   return console.log(`${this.make} increased to ${this.speed}`);
// };
// Car.prototype.brake = function () {
//   this.speed = this.speed - 5;
//   return console.log(`${this.make} decreased to ${this.speed}`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = Number.parseInt(charge);
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = Number.parseInt(chargeTo);
//   return console.log(`The ${this.make} is now charged to ${this.charge}%`);
// };

// EV.prototype.accelerate = function () {
//   this.speed = this.speed + 20;
//   return console.log(`${this.make} EV speed increased to ${this.speed}`);
// };

// const byd = new EV('BYD', 300, '30%');
// console.log(byd.make, byd.speed, byd.charge);
// byd.accelerate();
// byd.accelerate();
// byd.brake();
// byd.brake();
// byd.chargeBattery('90%');

// ES6 Inheritance

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   calcAge() {
//     console.log(2025 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2025 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 👋');
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, major) {
//     // Always needs to happen first! (it create this of subclass)
//     super(fullName, birthYear);
//     this.major = major;
//     // Inherits the properties of Super Class (Person)
//   }

// introduce() {
//   console.log(
//     `Hi, I'm ${this.fullName}. Born in the year ${this.birthYear}, and I study ${this.major}.`
//   );
// }
// }

// const martha = new StudentCl('Martha Jones', 2000, 'Mathmatics');

// martha.introduce();
// martha.calcAge();

// Object.create() Inheritance

// const PersonProto = {
//   calcAge() {
//     console.log(2025 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);

// StudentProto.init = function (firstName, birthYear, major) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.major = major;
// };

// StudentProto.introduce = function () {
//   console.log(
//     `Hi, I'm ${this.firstName}. Born in the year ${this.birthYear}, and I study ${this.major}.`
//   );
// };

// const jay = Object.create(StudentProto);
// jay.init('Jay', 1999, 'Computer Science');
// jay.introduce();

// Jay.__proto__ -> Student.__proto__ -> Person.__proto__
//                  Student.__proto__ -> Person.__proto__

// Another Class Example

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}.`);
  }

  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Jonas', 'USD', 1111);

// acc1.movements.push(240); //  Avoid
// acc1.movements.push(-120); // Avoid
// Avoid directly manipulating the property. instead use methods within the class that manipulates it.

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1);

// Encapsulation: Private Class Fields and Methods
