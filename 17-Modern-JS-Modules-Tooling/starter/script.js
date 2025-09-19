// Importing Module

// NAMED EXPORTS

// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';

// import * as ShoppingCart from './shoppingCart.js'; // Import everything

// console.log('IMPORTING MODULE');
// // console.log(cart);
// // addToCart('sugar', 2);
// // console.log(totalPrice, totalQuantity);
// // console.log(price, qt);
// // console.log(ShoppingCart.cart, ShoppingCart.qt);
// // ShoppingCart.addToCart('sugar', 2);

// import add from './shoppingCart.js';

// add('oranges', 3);
// add('apples', 3);
// add('cranberries', 7);
// console.log(cart);

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('placeholder');

// // TOP LEVEL AWAIT BLOCKS EXECUTION
// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   return { title: data.at(-1).title, text: data.at(-1).body };
// };
// const lastPost = await getLastPost();
// console.log(lastPost);

// THE MODULE PATTERN

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 123;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return { addToCart, cart, totalPrice, totalQuantity };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('orange', 4);
// console.log(ShoppingCart2);
import add from './shoppingCart.js';
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es'; // Parcel will import
add('banana', 5);
add('melon', 1);
add('grapes', 2);

if (module.hot) {
  // Parcel hot loading without refreshing page

  module.hot.accept();
}
