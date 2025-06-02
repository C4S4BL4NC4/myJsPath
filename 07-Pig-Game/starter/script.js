'use strict';

// Variables

let pScore = [0, 0];
let pTotal = [0, 0];
const maxScore = 100;
let turn = 0;
const diceHandle = document.querySelector('.dice');

// Functions

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

/* Program Flow */

// Dice Section

// Switch Section

// Game Reset
