import {cartquantity} from '../../data/cart.js';
export function updatehomelink(){
  document.querySelector('.js-return-to-home-link').innerHTML = `${cartquantity()} items`;
}