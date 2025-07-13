'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  movements.array.forEach(function (mov, i) {
    const movDirection = mov < 0 ? 'withdrawal' : 'deposit';
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${movDirection}">${
      i + 1
    } ${movDirection}</div>
        <div class="movements__date">0</div>
        <div class="movements__value">${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// // SLICE: Returns a new array.
// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2)); // ['c', 'd', 'e']
// console.log(arr.slice(2, 4)); // ['c', 'd']
// console.log(arr.slice(-2)); // ['d', 'e']
// console.log(arr.slice(1, -1)); // ['b', 'c', 'd']
// console.log(arr.slice()); // Shallow Copy ['a', 'b', 'c', 'd', 'e']
// console.log([...arr]); // ['a', 'b', 'c', 'd', 'e']

// //SPLICE: Like Slice but Mutates the array. Mainly used to remove the last element of an array.

// arr.splice(-1);
// console.log(arr); // ['a', 'b', 'c', 'd']
// arr.splice(1, 2);
// console.log(arr); // ['a', 'd']

// //REVERSE: Mutates  the original array.
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];

// console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
// console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

// // CONCAT:
// const letters = arr.concat(arr2); // FIRST.concat(SECOND)
// console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// console.log([...arr, ...arr2]);

// // JOIN:
// console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i - j

// ///////////////////////////////////////////////////

// const arr = [1, 2, 3];

// console.log(arr[0]);
// console.log(arr.at(0));

// // Getting the last element
// console.log(arr[arr.length - 1]); // OUTPUT: 3
// console.log(arr.slice(-1)[0]); // OUTPUT: 3
// console.log(arr.at(-1)); // OUTPUT: 3
// console.log(arr[-1]); // OUTPUT: undefined
// using at or the normal way to get if you want yo count from the end of an array you should use at. Also, for method chaining at is perfect too.

///////////////////////////////////////////////////

// ----- FOREACH -----

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   console.log(
//     `${i + 1}: ${movement > 0 ? 'deopsited' : 'withdrown'} ${movement}$`
//   );
// }
// // Orders of forEach anon function MATTER!
// movements.forEach(function (movement, index, array) {
//   console.log(
//     `${index}: ${movement > 0 ? 'deopsited' : 'withdrown'} ${movement}$
//     ${array}`
//   );
// });

/*
  0: deopsited 200$
    200,450,-400,3000,-650,-130,70,1300
  1: deopsited 450$
    200,450,-400,3000,-650,-130,70,1300
  2: withdrown -400$
    200,450,-400,3000,-650,-130,70,1300
 3: deopsited 3000$
    200,450,-400,3000,-650,-130,70,1300
 4: withdrown -650$
    200,450,-400,3000,-650,-130,70,1300
 5: withdrown -130$
    200,450,-400,3000,-650,-130,70,1300
 6: deopsited 70$
    200,450,-400,3000,-650,-130,70,1300
 7: deopsited 1300$
    200,450,-400,3000,-650,-130,70,1300
*/

// BTS:
// 0: function (200)
// 1: function (450)
// 2: function (-400)
// 3: function (3000)
// ...
///////////////////////////////////////////////////

// ------ FOREACH WITH MAPS AND SETS ------ \\
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (val, key, map) {
  console.log(`${key}: ${val}`);
});
/*
---- OUTPUT ----
    USD: United States dollar
    EUR: Euro
    GBP: Pound sterling
*/
/*
// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

console.log(currenciesUnique);

currenciesUnique.forEach(function (val, key, map) {
  console.log(`${key}: ${val}`);
});
*/
/*
---- OUTPUT ----
    USD: USD
    GBP: GBP
    EUR: EUR
*/

// A Set doesn't have a key neither an index so the designer of forEach decided to keep the val as key for set to remain consistent.
