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

let isSorted = false;

const createUsernames = function (arr) {
  arr.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsernames(accounts);

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const movDirection = mov < 0 ? 'withdrawal' : 'deposit';
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${movDirection}">${movDirection}</div>
        <div class="movements__date">FIX DArecieved</div>
        <div class="movements__value">${Math.abs(mov)}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, elm) => acc + elm, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const recieved = function (movements) {
  const income = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;
};
const sent = function (movements) {
  const moneySent = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${moneySent}€`;
};
const intrest = function (movements) {
  const intr = movements
    .filter(mv => mv > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${intr.toFixed(2)}€`;
};
const updatePage = function (currentLogin) {
  displayMovements(currentLogin.movements);
  calcBalance(currentLogin);
  recieved(currentLogin.movements);
  sent(currentLogin.movements);
  intrest(currentLogin.movements);
  console.log('PAGE UPDATED');
};

let currentLogin = [];

btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); // To prevent the submit that is default for forms.

  currentLogin = accounts.find(
    account => inputLoginUsername.value === account.username
  );

  if (currentLogin?.pin === Number(inputLoginPin.value)) {
    console.log('Successful Login');
    // Welcome
    labelWelcome.textContent = `Welcome back, ${
      currentLogin.owner.split(' ')[0]
    }`;
    // Display UI
    containerApp.style.opacity = 100;
    updatePage(currentLogin);
  } else {
    console.log('Wrong Credientials');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentLogin.balance >= amount &&
    receiverAcc?.username !== currentLogin.username
  ) {
    console.log('Valid Transfer');
    console.log(currentLogin, currentLogin.balance, amount, receiverAcc);
    currentLogin.balance -= amount;
    currentLogin.movements.push(-1 * amount);
    receiverAcc.movements.push(amount);
    updatePage(currentLogin);
  } else {
    console.log('Invalid Transfer');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  // Bank Rule: grant loan if at least there's 1 deposit with %10 of the requested loan amount.
  const loanAmount = Number(inputLoanAmount.value);
  console.log(
    'Loan Button Working',
    loanAmount,
    currentLogin.movements.some(ent => ent > 0)
  );
  if (
    loanAmount > 0 &&
    currentLogin.movements.some(mov => mov > 0 && mov / loanAmount >= 0.1)
  ) {
    console.log('Valid Loan Granted');
    currentLogin.movements.push(loanAmount);
    updatePage(currentLogin);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const confirmUsername = inputCloseUsername.value;
  const confirmPin = Number(inputClosePin.value);
  console.log(confirmUsername, confirmPin);
  const accIndex = accounts.findIndex(acc => acc.username === confirmUsername);

  // Confirm the account's existance
  if (
    currentLogin.pin === confirmPin &&
    currentLogin.username === confirmUsername
  ) {
    // Delete
    accounts.splice(accIndex, 1);

    // Logout Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    console.log(`${currentLogin.username} has been deleted!`);
  }
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  const sorted = currentLogin.movements.sort((a, b) => a - b);
  if (isSorted === false) {
    displayMovements(sorted);
    isSorted = true;
  } else if (isSorted === true) {
    displayMovements(currentLogin.movements.sort((a, b) => b - a));
    isSorted = false;
  }
});

// When Loading someone's account run funcitons only

/*
const mv = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = mv.filter(function (elm) {
  return elm > 0;
});

console.log(deposits); // [200, 450, 3000, 70, 1300]

const withdrawals = mv.filter(elm => elm < 0);

console.log(withdrawals); // [-400, -650, -130]*/

// Reduce method arrays

/*

const mv = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = mv.reduce(function (acc, cur, i, arr) {
  console.log(`Iter ${i}: Accu ${acc}`);
  return acc + cur;
}, 0);

// Iter 0: Accu 0
// Iter 1: Accu 200
// Iter 2: Accu 650
// Iter 3: Accu 250
// Iter 4: Accu 3250
// Iter 5: Accu 2600
// Iter 6: Accu 2470
// Iter 7: Accu 2540

console.log(balance); // 3840

*/

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

/*
const max = account1.movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, 0);
console.log('Max: ' + max);
*/

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge1 = function (ages) {
  const dogHumanAges = ages.map(dog => {
    if (dog <= 2) return 2 * dog;
    else return (16 + dog) * 4;
  });
  const filteredHumanDogs = dogHumanAges.filter(dog => dog > 18);
  const total = filteredHumanDogs.reduce((accumulator, curelm, index) => {
    return accumulator + curelm;
  }, 0);

  console.log(`
    Original Array of Dog Ages:
    ${ages}

    Tunred Into Human Ages: 
    ${dogHumanAges}

    Excluding Non-Adults Dogs:
    ${filteredHumanDogs}

    Average Dog Age:
    ${total / filteredHumanDogs.length}
    `);
};

calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge1([16, 6, 10, 5, 6, 1, 4]);
*/
/*
const eurToUsd = 1.1;
const totalDepositsUSD = account1.movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/
///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (ages) {
  const avr = ages
    .map(dog => {
      if (dog <= 2) return 2 * dog;
      else return (16 + dog) * 4;
    })
    .filter(dog => {
      return dog > 18;
    })
    .reduce((accumulator, curelm, i, arr) => {
      return accumulator + curelm / arr.length;
    }, 0);

  console.log('Average Dog Age: ' + avr);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // 92
*/
// ------------ FIND ----------
// Just like filter find need a callback function that returns a bool also find returns the first element that satisfies the condition (doesn't return an array)

// ------------- findIndex -------------
/*
The findIndex() method of Array instances returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.

See also the find() method, which returns the first element that satisfies the testing function (rather than its index).
*/

// const array = [5, 12, 8, 130, 44];

// const isLargeNumber = (element) => element > 13;

// console.log(array.findIndex(isLargeNumber));
// // Expected output: 3

//

// flat(depth) array method:
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);
// // flatmap() goes only one level. (Better Performance)
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

/*
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"

const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)

console.log(
  breeds.find(
    breed =>
      breed.activities.includes('running') && breed.activities.includes('fetch')
  ).breed
);

// 3. Create an array "allActivities" of all the activities of all the dog breeds

const allActivities = breeds.flatMap(breed => breed.activities);
console.log(allActivities);

// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".

const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(bree => bree.activities.includes('swimming'))
      .flatMap(bree => bree.activities)
      .filter(act => act !== 'swimming')
  ),
];
console.log(swimmingAdjacent);

// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".

console.log(
  `All dogs have average weight of 10KG or more? ${breeds
    .map(dog => dog.averageWeight)
    .every(ent => ent >= 10)}`
);

// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

console.log(breeds.map(dog => dog.activities.length).some(act => act >= 3));

// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

console.log(
  Math.max(
    ...breeds
      .filter(dog => dog.activities.includes('fetch'))
      .map(dog => dog.averageWeight)
  )
);
*/

// Sorting arrays array.sort()
// Strings
// const champs = ['Annie', 'Zed', 'Ekko', 'Jayce', 'Warwick', 'Corki', 'Braum'];

// console.log(champs);
// console.log(champs.sort());

// // Numbers
// const nums = [-15, 55, 32, 12, 9, 35];
// console.log(nums);

// // return < 0, A, B
// // return > 0, B, A
// // console.log(
// //   nums.sort((a, b) => {
// //     if (a > b) return 1; // Return Something greater than 0
// //     if (b > a) return -1; // Retrun Something negative
// //   })
// // );
// console.log(nums.sort((a, b) => a - b));
// console.log(nums.sort((a, b) => b - a));
