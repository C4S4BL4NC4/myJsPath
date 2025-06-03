'use strict';

// Pig Game
// A simple dice game where two players take turns to roll a dice and accumulate points.
// Note: the code needs to be DRYer and more modular, but for the less of time I wanna spend here, I kept it messy :P

// Variables

let currentScore = 0; // Current Score
let pTotal = [0, 0]; // Total Score
const maxScore = 100; // Game's max score
let turn = false; // Whose Turn

// Element Handlers

function getCurrentEL() {
  return document.getElementById(`current--${turn === false ? 0 : 1}`);
}
function getScoreEL() {
  return document.getElementById(`score--${turn === false ? 0 : 1}`);
}
function getPlayerEL() {
  return document.querySelector(`.player--${turn === false ? 0 : 1}`);
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
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  diceEL.classList.add('hidden');
  rollBtnEL.classList.remove('hidden');
  holdBtnEL.classList.remove('hidden');
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
  currentScore = 0;
  init();
  pTotal = [0, 0];
  turn = false;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  diceEL.classList.add('hidden');
  getCurrentEL().textContent = 0;
  getCurrentEL(true).textContent = 0;
  getScoreEL().textContent = 0;
  getScoreEL(true).textContent = 0;
  newGameEL.classList.add('hidden');
  rollBtnEL.classList.remove('hidden');
  holdBtnEL.classList.remove('hidden');
  rollBtnEL.disabled = false;
  holdBtnEL.disabled = false;
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
    pTotal[0] += Number(getCurrentEL(turn).textContent);
    getScoreEL().textContent = pTotal[0];
    currentScore = 0;
    getCurrentEL(turn).textContent = 0;
    if (pTotal[0] >= maxScore) {
      getPlayerEL().classList.add('player--winner');
      newGameEL.classList.remove('hidden');
      diceEL.classList.add('hidden');
      holdBtnEL.classList.add('hidden');
      rollBtnEL.classList.add('hidden');
      return;
    }
    switchActive(turn);
    turn = true;
  } else {
    pTotal[1] += Number(getCurrentEL(turn).textContent);
    getScoreEL().textContent = pTotal[1];
    currentScore = 0;
    getCurrentEL(turn).textContent = 0;
    if (pTotal[1] >= maxScore) {
      getPlayerEL().classList.add('player--winner');
      newGameEL.classList.remove('hidden');
      diceEL.classList.add('hidden');
      diceEL.classList.add('hidden');
      holdBtnEL.classList.add('hidden');
      rollBtnEL.classList.add('hidden');
      return;
    }
    switchActive(turn);
    turn = false;
  }
  console.log('Player' + turn + ' turn');
});

// Game Reset

resetBtnEL.addEventListener('click', function () {
  resetGame();
});
