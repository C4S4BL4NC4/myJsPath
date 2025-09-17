'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} M</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
              </div>
            </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.textContent = '';
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// Promisifying Geolocation
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   pos => resolve(pos),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
/*
// const getCountry = function (coutnryName) {
//   const request = new XMLHttpRequest(); // Oldschool way

//   // XMLHttpRequest we need it in the future
//   // Show us how old ajax used to function back in the day

//   request.open(
//     'GET',
//     `https://restcountries.com/v2/name/${coutnryName.toLowerCase()}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `
//         <article class="country">
//               <img class="country__img" src="${data.flag}" />
//               <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(
//                   +data.population / 1000000
//                 ).toFixed(1)} M</p>
//                 <p class="country__row"><span>🗣️</span>${
//                   data.languages[0].name
//                 }</p>
//                 <p class="country__row"><span>💰</span>${
//                   data.currencies[0].name
//                 }</p>
//               </div>
//             </article>
//         `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountry('Nigeria');
// getCountry('Vietnam');
// getCountry('Greece');
// ✅✅✅✅✅✅

// Callback Hell

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} M</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
              </div>
            </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (coutnryName) {
  const request = new XMLHttpRequest(); // Oldschool way

  // XMLHttpRequest we need it in the future
  // Show us how old ajax used to function back in the day

  request.open(
    'GET',
    `https://restcountries.com/v2/name/${coutnryName.toLowerCase()}`
  );
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);

    // Get AJAX CALL neighbor country (2) depends on call (1)
    const neighbor = data.borders?.[0];
    if (!neighbor) return;
    const request2 = new XMLHttpRequest();

    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbor('Argentina');

*/
// Callback Hell = (Recursive Callbacks) (Nested Callbacks)

// Promisies are used to avoid callback hell.

// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country.toLowerCase()}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country Not Found! ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data, 'neighbour');
//     })
//     .catch(err => renderError(err.message))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// Rejected Promises

// const getJSON = function (url, errorMsg = 'Something went wrong!') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
//     return response.json();
//   });
// };

// const getCountry = function (country) {
//   // Country 1
//   getJSON(
//     `https://restcountries.com/v2/name/${country.toLowerCase()}`,
//     'Country Not Found!'
//   )
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//       // Country 2
//       const neighbour = data[0].borders?.[0];
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country Not Found!'
//       );
//     })
//     .then(data => {
//       renderCountry(data, 'neighbour');
//     })
//     .catch(err => renderError(err.message))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   countriesContainer.textContent = '';
//   getCountry('serbia');
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//   let country = '';
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(`You are in ${data.city}, ${data.countryName}`);

//     country = data.countryName;
//   });

//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   )
//     .then(response => {
//       if (!response.ok) throw new Error('Country Not Found 1st API');
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('Country Not Found 2nd API');
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       return renderCountry(data);
//     })
//     .catch(err => {
//       countriesContainer.textContent = '';
//       countriesContainer.insertAdjacentText('beforeend', `💥 ${err} 💥`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   // whereAmI(52.508, 13.381);
//   // whereAmI(19.037, 72.873);
//   // whereAmI(+prompt('lat'), +prompt('lng'));
//   whereAmI(41.06985265629142, 29.041425918037646);
// });

// Callback Queue and Microtask Queue

// console.log('Test start'); // 1

// setTimeout(() => console.log('0 Sec Timer'), 0); // 4

// Promise.resolve('Resolved Promise 1').then(res => console.log(res)); // 3

// console.log('Test End'); // 2

// Building Promises

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Longfellow...');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You won 🏆️');
//     } else {
//       reject(new Error('You lost 💥'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 Second Passed.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 Second Passed.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 Second Passed.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 Second Passed.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('5 Second Passed.');
//     return wait(1);
//   });

// navigator.geolocation.getCurrentPosition(
//   pos => console.log(pos),
//   err => console.error(err)
// );

// // Promisifying Geolocation
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   pos => resolve(pos),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = function (lat, lng) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(`You are in ${data.city}, ${data.countryName}`);
//   });

// fetch(
//   `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
// )
//     .then(response => {
//       if (!response.ok) throw new Error('Country Not Found 1st API');
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('Country Not Found 2nd API');
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       return renderCountry(data);
//     })
//     .catch(err => {
//       countriesContainer.textContent = '';
//       countriesContainer.insertAdjacentText('beforeend', `💥 ${err} 💥`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   // whereAmI(52.508, 13.381);
//   // whereAmI(19.037, 72.873);
//   // whereAmI(+prompt('lat'), +prompt('lng'));
//   // getPosition().then(data => console.log(data.coords));
//   whereAmI(
//     getPosition().then(data => data.coords.latitude),
//     getPosition().then(data => data.coords.longitude)
//   );
// });

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// let globEl = '';

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const imgEl = document.createElement('img');
//     imgEl.src = imgPath;
//     imgEl.addEventListener('error', e => reject(e));
//     //TODO
//     imgEl.addEventListener('load', function () {
//       document.body.appendChild(imgEl);
//       resolve(imgEl);
//     });
//   });
// };
// createImage('img/img-1.jpg')
//   .then(data => {
//     globEl = data;
//     return wait(2);
//   })
//   .then(() => {
//     globEl.style.display = 'none';
//     createImage('img/img-2.jpg').then(data => (globEl = data));
//     return wait(2);
//   })
//   .then(() => {
//     globEl.style.display = 'none';
//     createImage('img/img-3.jpg').then(data => (globEl = data));
//   })
//   .catch(err => console.error(err));

/////
/////
/////
/////
/////

// const whereAmI = async function () {
//   // fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
//   //   res.json()
//   // ).then(data => console.log(...data));
//   //SAME THING

//   // Error Handling
//   try {
//     // geoloc
//     const pos = await getPosition();
//     const { latitiude: lat, longitude: lng } = pos.coords;

//     // revGeoLoc
//     const resGeo = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//     );
//     if (!resGeo.ok) throw new Error('Problem Getting The Geo Location Data');

//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     // countryData
//     const res = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.countryName}`
//     );
//     if (!res.ok) throw new Error('Problem Getting Country Data');
//     const data = await res.json();
//     console.log(data[0]);
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
//   } catch (err) {
//     console.error(err);
//     renderError(`Something went wrong! ${err.message} 💥`);

//     // Reject promise return from async function
//     throw err;
//   } finally {
//     btn.style.opacity = 0;
//     countriesContainer.style.opacity = 1;
//   }
// };

// // Try catch

// // try {
// //   let y = 1;
// //   const x = 9;
// //   x = 3;
// // } catch (err) {
// //   console.log(err);
// // }

// // Using Return values of async/await

// // whereAmI().then(city => console.log(city)); // Using Then OR ->

// // Using an iife

// (async function () {
//   const city = await whereAmI();
//   console.log(city);
// })();

///     ///     ///     ///

///     ///     ///

///     ///

///

// Getting data of 3 countries where order DON'T matter (Parallel Promises)

const get3Countries = async function (c1, c2, c3) {
  try {
    /*
    const [dataC1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    const [dataC2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const [dataC3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    console.log([dataC1.capital, dataC2.capital, dataC3.capital]);
    */

    // Run Parallel Promises

    // Promise.all() receives and returns an Array.
    // Promise.all() short circuits if a single promise is rejected.

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('Hungary', 'Greece', 'Slovakia');
