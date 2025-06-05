'use strict';
/*
3 Types of scopes: Global, Function, and {} Block

Global is outside of everyfunction and block

Function: Variable decalred within a fucntion remain within that function

Block: Variables declared within a block (while, for, if) with let and const.
 var: allows the variable to be called outside of the block. And is function scoped.


*/

// Variables
console.log(me);
console.log(job);
console.log(year);

var me = 'Kaz';
let job = 'Student';
const year = 1990;

// Functions

function addD(a, b) {
  return a + b;
}

// DON'T USE VAR TO DECLARE VARIABLES
