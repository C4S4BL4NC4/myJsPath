'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2025-08-04T23:36:17.929Z',
    '2025-08-07T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-GB', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = `${date.getFullYear()}`;

    return `${day}/${month}/${year}`;
  }
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCur(
          movement,
          acc.locale,
          acc.currency
        )}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCur(
    Math.abs(out),
    acc.locale,
    acc.currency
  )}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  // Set Time of 5m
  let time = 10;
  // Call the time every second
  const timeCaller = setInterval(function () {
    // Print remaining time to UI
    labelTimer.textContent = --time;
    // When time expires  at 0 stop and logout usr
  }, 1000);
};
///////////////////////////////////////
// Event handlers
let currentAccount;

// Expermenting API Internat

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // As of CurrentDate

  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short', // 2-digit, long
    year: 'numeric',
    weekday: 'short',
  };

  labelDate.innerHTML = `${new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now)}`;
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Add Dates
    currentAccount.movementsDates.push(Date.now());
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // ADDED ADDED ADDED ADDED
      currentAccount.movementsDates.push(Date.now());

      // Update UI
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);

  sorted = !sorted;
});

// Movements Date

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Number internally always represneted by floating point numbers thus the one data type for all numbers

// Number are stored in base2

// Weird behaviour
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// // Converion: BTS type coerstion
// console.log(Number('2'));
// console.log(+'2');

// // Parsing Number.parseInt(string[extract num], radix[base n])
// console.log(Number.parseInt('30px', 10)); // 30

// console.log(Number.parseInt('e32', 10)); // NaN must lead with a number

// console.log(Number.parseFloat('2.5rem', 10)); // 2.5

// console.log(Number.isNaN('swag')); // USE TO CHECK IF VALUE IS NAN

// console.log(Number.isFinite(23 / 0)); // USE TO FIND IF ANY VAL IS A NUMBER

/////////////////////////////////////////////////
// Rounding Numbers

// console.log(Math.sqrt(4));

// console.log(Math.max(2, 54, 7, 8, 4, 332));
// console.log(Math.min(2, 54, 7, 8, 4, 332));

// console.log(Math.PI);

// console.log(Math.trunc(Math.random() * 6) + 1);

// console.log(Math.floor(2.56)); // Round Down
// console.log(Math.floor(-2.56)); // Round Down

// console.log(Math.ceil(24.1)); // Round Up
// console.log(Math.ceil(-24.1)); // Round Up

// console.log(Math.round(24.55)); // Round to the nearest int

// // Rounding Decimals
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.345).toFixed(2));
// console.log((23.4).toFixed(12));

///////////////////////////////
// Remainder Operator

// console.log(5 % 2); // 1
// console.log(32 % 2 === 0 ? 'even' : 'odd');
// console.log(213455 % 10); // Gives the last first right side digit of a number

// ////////////////////////////////////////
// // Numeric Seperators

// const diameter = 287_250_000_000;
// console.log(diameter); // 287250000000

// const PI = 3.14_15;
// console.log(PI); // 3.1415

// ////////////////////////////
// // BigInt

// // Js numbers are represented by 2^64 but actually only 53 bits are used for the actual numbers so:
// console.log(2 ** 53 - 1); //9007199254740991
// console.log(Number.MAX_SAFE_INTEGER); //9007199254740991

// //BIG INT is NUMn
// console.log(4363245724845374857123946n); // 4363245724845374857123946n
// console.log(BigInt(342385742524523)); // 342385742524523n
// console.log(10000n + 10000n); // 20000n

// // bigint and regular Numbers don't mix

// console.log(20n > 15);
// console.log(20n === 20);
// console.log(typeof 20n);
// console.log(20n == '20');

// // Divs

// console.log(11n / 3n); // 3n cuts the decimal parts
// console.log(11 / 3); // 3.6666666666666665

///////////////////////////////
// Dates and times

// Create a date there are 4 ways

// const now = new Date();
// console.log(now); // Thu Aug 07 2025 18:52:19 GMT+0300 (GMT+03:00)

// console.log(new Date('Thu Aug 07 2025 18:51:12')); // Thu Aug 07 2025 18:51:12 GMT+0300 (GMT+03:00)

// console.log(new Date('December 24, 2014')); //Wed Dec 24 2014 00:00:00 GMT+0200 (GMT+03:00)

// console.log(new Date(account1.movementsDates[0])); // Tue Nov 19 2019 00:31:17 GMT+0300 (GMT+03:00)

// console.log(new Date(2043, 10, 34)); //Tue Dec 04 2043 00:00:00 GMT+0300 (GMT+03:00) Auto corrects for Dec 4

// console.log(new Date(0)); // Thu Jan 01 1970 02:00:00 GMT+0200 (GMT+03:00)

// // Working With Dates

// const future = new Date(2043, 10, 34, 12, 43, 58);
// console.log(future);
// console.log(future.getFullYear()); // 2043
// console.log(future.getMonth()); // 11
// console.log(future.getDate()); // 4
// console.log(future.getDay()); // 5
// console.log(future.getHours()); // 12
// console.log(future.getMinutes()); // 43
// console.log(future.getSeconds()); // 58
// // Timestamp = miliseconds passed since Jan 1970
// console.log(future.getTime()); // 2332835038000
// console.log(new Date(2332835038000)); // Fri Dec 04 2043 12:43:58 GMT+0300 (GMT+03:00)

// console.log(Date.now()); // Timestamp of now\
// future.setFullYear(2040);
// console.log(future); // Tue Dec 04 2040 12:43:58 GMT+0300 (GMT+03:00)

// console.log(new Date('2019-11-18T21:31:17.178Z').getFullYear());

//////////////////////////////////////
// Operations with Dates

// const future = new Date(2024, 2, 1, 4, 0, 0);
// console.log(+future); // Converting into a number turns it into a timestamp instead of a stringated date 2332835038000
// console.log(Number(future)); // Converting into a number turns it into a timestamp instead of a stringated date 2332835038000

// const daysPassed = (fromDate, toDate = Date.now()) =>
//   Math.abs(fromDate - toDate) / (1000 * 60 * 60 * 24);

// console.log(daysPassed(new Date(2023, 2, 6), new Date(2034, 6, 18)));

//////////////////////////////////////
// Internationalization: (formating dates and numbers)

//////////////////////////////
// Inter Numbers

// const num = 38884764.23;
// const options = {
//   style: 'unit', // percent
//   unit: 'mile-per-hour', // Celsius
//   currency: 'EUR',
//   useGrouping: false,
// };
// console.log('US: ', new Intl.NumberFormat('en-US', options).format(num)); // US:  38,884,764.23 mph
// console.log('SY: ', new Intl.NumberFormat('ar-SY', options).format(num)); // SY:  ٣٨٬٨٨٤٬٧٦٤٫٢٣ ميل/س
// console.log('GR: ', new Intl.NumberFormat('de-DE', options).format(num)); // GR:  38.884.764,23 mi/h

////////////////////////////////////////
// Timers
// const herbs = ['cinamonn', 'mint', 'skibidi'];

// const teaTime = setTimeout(
//   (herb1, herb2) =>
//     console.log(`Here's the mfkin tea with ${herb1} and ${herb2}`),
//   3000,
//   ...herbs
// ); // Here's the mfkin tea with cinamonn and mint

// if (herbs.includes('skibidi')) {
//   console.log('SKIBIDI TEA DETECTED!!!!!');
//   clearTimeout(teaTime);
// }
// Timer will cancel and bacuse contidion evaluates cleartimout
/////////////////////////////////////////
// // Set Interval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);
