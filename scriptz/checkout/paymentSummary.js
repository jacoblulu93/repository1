import {cart, removeFromCart,updatedelopt,cartquantity} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatprice } from "../util/utils.js";
import { deliveryOptions, getDelopt } from "../../data/deliveryoptions.js";
import { addOrder } from "../../data/ordersbackend.js";

export function RenderPaymentSummary(){
  let itemprice = 0;
  let delprice = 0;
  cart.forEach(cartitem => {
    const {productId,deloptid} = cartitem;
    console.log(productId + ' '+deloptid);

    let matchingitem = getProduct(productId);
    let matchingdeliv = getDelopt(deloptid);
    console.log(matchingitem.priceCents);
    console.log(matchingdeliv.priceCents);
    delprice += matchingdeliv.priceCents;
    itemprice += matchingitem.priceCents*cartitem.quantity;
  });
  console.log('Itemprice: '+itemprice);
  console.log('Delprice: '+delprice);
  console.log(`Totallprice: ${delprice+itemprice}`);
  console.log(`Tax: ${(delprice+itemprice)*0.1}`);
  console.log(`Taxedprice: ${(delprice+itemprice)*1.1}`);

  const html = `
  <div class="payment-summary-title">
  Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (${cartquantity()}):</div>
  <div class="payment-summary-money">$${formatprice(itemprice)}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$${formatprice(delprice)}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$${formatprice(itemprice+delprice)}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$${formatprice((itemprice+delprice)*0.1)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money js-payment-total">$${formatprice((itemprice+delprice)*1.1)}</div>
</div>

<button class="place-order-button button-primary js-place-order-button">
  Place your order
</button>
  `
  document.querySelector('.js-payment-summary').innerHTML = html;
  document.querySelector('.js-place-order-button').addEventListener('click', async ()=>{
    try{
    const response = await fetch('https://supersimplebackend.dev/orders',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        cart:cart
      })
    });
    const order = await response.json();
    addOrder(order);

    }catch (error){
      console.log('unexpeted error. pls try again');
    }
    
    window.location.href=('orders.html');
  })
}