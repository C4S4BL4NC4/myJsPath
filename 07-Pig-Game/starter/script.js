'use strict';

// Variables

let currentScore = 0; // Current Score
let pTotal = [0, 0]; // Total Score
const maxScore = 30; // Game's max score
let turn = false; // Whose Turn

// Element Handlers

function getCurrentEL() {
  return document.getElementById(`current--${turn === false ? 0 : 1}`);
}
function getScoreEL() {
  return document.getElementById(`score--${turn === false ? 0 : 1}`);
}
const diceEL = document.querySelector('.dice');
const newGameEL = document.querySelector('.btn--new');
const rollBtnEL = document.querySelector('.btn--roll');
const resetBtnEL = document.querySelector('.btn--new');
const holdBtnEL = document.querySelector('.btn--hold');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

// Functions

function init() {
  // Initalize HTML values

  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  diceEL.classList.add('hidden');
  newGameEL.classList.add('hidden');
}

function roll() {
  diceEL.classList.remove('hidden');
  let rolls = Math.trunc(Math.random() * 6) + 1;
  diceEL.src = `dice-${rolls}.png`;
  return rolls;
}

function switchActive(turn) {
  if (turn === false) {
    player0EL.classList.remove('player--active');
    player1EL.classList.add('player--active');
  }
  if (turn === true) {
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
  }
}

function resetGame() {
  console.log('Game is Reset');
}

/* Program Flow */

init();

// Dice Button

rollBtnEL.addEventListener('click', function () {
  let diceRoll = roll();
  if (diceRoll !== 1) {
    currentScore = currentScore + diceRoll;
    getCurrentEL().textContent = currentScore;
  } else if (diceRoll === 1) {
    currentScore = 0;
    getCurrentEL().textContent = currentScore;
    switchActive(turn);
    turn = !turn;
  }
});

// Hold Button

holdBtnEL.addEventListener('click', function () {
  diceEL.classList.add('hidden');
  if (turn === false) {
    switchActive(turn);
    turn = true;
  } else {
    switchActive(turn);
    turn = false;
  }
  console.log('Player' + turn + ' turn');
});

// Game Reset

resetBtnEL.addEventListener('click', function () {
  resetGame();
});
