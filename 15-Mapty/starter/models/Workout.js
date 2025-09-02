'use strict';

export default class Workout {
  date = new Date();
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; // km
    this.duration = duration; // min
  }

  #getRandomNumber = (min, max) => {
    let randNum = (Math.random() * (max - min) + min).toFixed(0);
    randNum = randNum.padStart(3, '0');
    return randNum;
  };

  _setID() {
    this.id = `${this.#getRandomNumber(0, 999)}${
      this.type === 'running' ? 'RN' : 'CY'
    }${(Date.now() + '').slice(-4)}`;
  }
  _setDescription() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}
