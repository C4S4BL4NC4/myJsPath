'use strict';

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 29,
  family: ['Alice', 'Bob'],
};

// Shallow Copy
const marriedJessica = { ...jessica };

marriedJessica.lastName = 'Davis';
marriedJessica.family.push('Sam');

console.log(jessica);
console.log(marriedJessica);

// Deep Copy or Deep Clone

const hammond = {
  firstName: 'Hammond',
  lastName: 'Avidson',
  age: 39,
  family: ['Moe', 'Martina'],
};

const hammondClone = structuredClone(hammond);
hammondClone.family.push('Salah');

console.log(hammond);
console.log(hammondClone);
