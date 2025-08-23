'use strict';

// Constructor Functions: Always start with Capital letter. Arrow functions don't work in construction function because it does not have "this" keyword.

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Never do this create a method inside constructor function because when you have a lot of instances you'd be making 1000 copies of that function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
};
/*

*/
const jonas = new Person('Jonas', 1991);
//console.log(jonas);

const donna = new Person('Donna', 1999);
console.log(donna);

//const jo = 'Jo';
//console.log(jo instanceof Person);
//console.log(jonas instanceof Person);

// When calling function using 'new'
// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

// Prototypes: every object ships with Prototype property that itself is an object so it also has a prototype within it. This is called Porottype chaining the chain breaks when protottype tree ends with a null. Adding methods to the prototype object is better that adding them within the constructor function for you only add them once. And you have access directly to them methods inside of the prototype because of prototypal inheretence. "donna.clacAge();"

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
