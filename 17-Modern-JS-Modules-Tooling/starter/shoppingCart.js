//  Exporting Module
// console.log('EXPORTING MODULE');

// Named Exports
// const shipping = 10;
const cart = [];
// export { cart, shipping };

// export const addToCart = function (product, quantity) {
//   // Named export
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };

// const totalPrice = 234;
// const totalQuantity = 5;

// export { totalPrice, totalQuantity as qt };

// Default Exports
// Default Exports -> when you wanna export one thing per module.

export default function (product, quantity) {
  // Named export
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
