'use strict';
// strict mode avoids bugs and reserves keywords that are js spicific from
// being used in code (best prac to use strict)

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive');
*/

// Functions

function logger() {
  console.log('my name is Pengu');
}

logger();
logger();
logger();

// Dynamic types are messing with my head I HATE to see Any as a paratmeter
// type!!!
function sword(hilt, blade) {
  console.log(hilt, blade);
  const katana = `The Katana has a long ${hilt}, and even a longer ${blade}!`;
  return katana;
}

console.log(sword(`hilt`, `blade`));


function getAge(birthYear) {
  if (typeof (birthYear) === 'number') {
    return 2025 - birthYear;
  } else {
    return `Error has occured`;
  }
}

console.log(getAge(1990));

// Always Define THEN Declare a function

// Arrow function

const yearsUntilRetirment = (birthYear, firstName) => {
  const age = 2025 - birthYear;
  const retirment = 65 - age;
  return `${firstName} retires in ${retirment} year from now!`;
};

console.log(yearsUntilRetirment(1995, `Mert`));



// Arrays
const friend1 = `Ali`;
const friend2 = `Bassim`;
const friend3 = `Waard`;

const friends = ['Cagla', 'Hamit', 'Roary'];
console.log(friends);

const years = new Array(1999, 2000, 2003, 2015);

console.log(friends[0]);
// Arrays are zero based.

console.log(years.length);
console.log(friends[friends.length - 1]);

// Mutate an array
friends[2] = 'Rula';
console.log(friends);
// ONLY PRIMITIVE VALUES ARE IMMUTABLE (WIERD ASF)

const information = ['Bob', 'Dylan', 70, 1975, years];
console.log(information);

// Array Methods
friends.push('Mustafa');  // Add to end
console.log(friends);
friends.unshift('Jessie');  // Add to begining
console.log(friends);

// Removing elements
friends.pop();  // Last
console.log(friends);
const popped = friends.pop();  // We can assign certain popped value
console.log(popped);
friends.shift();  // First

console.log(friends.indexOf('Hamit'));
console.log(friends.includes('Malik'));

// Objects
const viniArray = [
  'Vini', 'Jr', 1990, 'Footballer', ['Mbappe', 'Modric', 'Jude']
];  // Notation to declare an array

const neymar = {
  fName: 'Neymar',
  lName: 'Jr',
  from: 'Brasil',
  birth: 1993,
  job: 'Footballer',
  fellas: ['Messi', 'Xavi', 'Mbappe'],
  isRetired: false,
  // calcAge: function() {
  //   console.log(this);
  //   return 2025 - this.birth;
  //   // birth year of the object without passing a value
  // }
  calcAge: function() {
    this.age =
        2025 - this.birth;  // Creating a variable/method on the spot instead of
                            // calling the calculation 3 times in line 135.
    return this.age;
  },

  getSummary: function() {
    return `${this.fName} ${this.lName} is a ${this.calcAge()} year old ${
        this.job} from ${this.from} he's currntly ${
        this.isRetired ? 'Retired' : 'Playing'}.`
  }
};

console.log(neymar);
console.log(neymar.fName);

const nameKey = 'Name';
console.log(neymar['f' + nameKey]);
console.log(neymar['l' + nameKey]);

// console.log(neymar[prompt('what about neymar? ')]);

neymar.location = 'Brazil';
neymar['instagram'] = '@neymarjr';
neymar.isRetired = false;
console.log(neymar.calcAge());

// Object methods
console.log(neymar.calcAge());
console.log(neymar.calcAge());
console.log(neymar.calcAge());

// CHALLENGE

// "Neymar from YY is a XX yo current footballer that is currently playing"

console.log(neymar.getSummary());
console.log(neymar.isRetired);
