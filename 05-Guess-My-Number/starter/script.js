'use strict';

/*
console.log(document.querySelector('.message').textContent);
// DOM = DOCUMENT OBJECT MODEL access html elements and css styles and manipulate them.
// DOM IS NOT NATIVE TO JAVASCRIPT INSTEAD IT COMES FROM WEBAPI THAT SHIPS WITH BROWESERS.
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 5;
console.log(secretNumber);
document.querySelector('.score').textContent = score;
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (guess !== secretNumber) {
    if (score <= 5 && score !== 0) {
      score--;
      document.querySelector('.score').textContent = score;
      document.querySelector('.message').textContent = `${distance(
        secretNumber,
        guess
      )} ${heat(secretNumber, guess)}`;
    } else if (score === 0 || score < 0) {
      document.querySelector('.message').textContent = 'You Lost!';
    }
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'You Got It!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
  }
});

// Again Functionality

document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 5;
  document.querySelector('.score').textContent = score;
  console.log(secretNumber);
});

function distance(trgt, xpec) {
  if (Math.abs(trgt - xpec) > 5) {
    return 'Far.';
  }
  if (Math.abs(trgt - xpec) <= 5 && Math.abs(trgt - xpec) > 2) {
    return 'Close.';
  }
  if (Math.abs(trgt - xpec) <= 2) {
    return 'Hot.';
  }
}

function heat(trgt, xpec) {
  if (trgt - xpec < 0) {
    return 'Go Lower.';
  }
  if (trgt - xpec > 0) {
    return 'Go Higher.';
  }
}
