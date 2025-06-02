'use strict';

// Variables

let pScore = [0, 0];
let pTotal = [0, 0];
const maxScore = 30;
let turn = 0;

// Element Handlers

const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const newGameEL = document.querySelector('.btn--new');
const rollBtnEL = document.querySelector('.btn--roll');
const resetBtnEL = document.querySelector('.btn--new');
const holdBtnEL = document.querySelector('.btn--hold');

// Functions

function init() {
  // Initalize HTML values

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEL.classList.add('hidden');
  //newGameEL.classList.add('hidden');
}

function roll() {
  let rolls = Math.trunc(Math.random() * 6) + 1;
  switch (rolls) {
    case 1:
      console.log(`${turn === 0 ? 'Player 1' : 'Player 2'} Rolled a 1`);
      break;
    case 2:
      console.log(`${turn === 0 ? 'Player 1' : 'Player 2'} Rolled a 2`);
      break;
    case 3:
      console.log(`${turn === 0 ? 'Player 1' : 'Player 2'} Rolled a 3`);
      break;
    case 4:
      console.log(`${turn === 0 ? 'Player 1' : 'Player 2'} Rolled a 4`);
      break;
    case 5:
      console.log(`${turn === 0 ? 'Player 1' : 'Player 2'} Rolled a 5`);
      break;
    case 6:
      console.log(`${turn === 0 ? 'Player 1' : 'Player 2'} Rolled a 6`);
      break;
    default:
      console.log(`${turn === 0 ? 'Player 1' : 'Player 2'} Defaulted`);
      break;
  }
}

function switchTurn(player) {
  if (player === 0) {
    // Player 1

    player = 1;
  }

  if (player === 1) {
    // Player 2

    player = 0;
  }
}

function addC2T(current, pTotalScore) {
  // Add current to total score of a player

  return (pTotalScore += current);
}

function resetGame() {
  console.log('Game is Reset');
}

/* Program Flow */

init();

// Dice Button

rollBtnEL.addEventListener('click', function () {
  roll();
});

// Hold Button

holdBtnEL.addEventListener('click', function () {
  console.log('Hold Clicked');
  switchTurn(turn);
});

// Game Reset

resetBtnEL.addEventListener('click', function () {
  resetGame();
});
