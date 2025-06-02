'use strict';

// Variables

let pScore = [0, 0];
let pTotal = [0, 0];
const maxScore = 100;
let turn = 0;

// Functions

function roll() {
  return Math.trunc(Math.random() * 6) + 1;
}

function turnSwitch(player) {
  if (player === 0) {
    // Player 1
    player = 1;
  }

  if (player === 1) {
    // Player 2
    player = 0;
  }
}

function addC2T(current, player) {
  // Add current to total score
}

/* Program Flow */

// Dice Section

// Switch Section

// Game Reset
