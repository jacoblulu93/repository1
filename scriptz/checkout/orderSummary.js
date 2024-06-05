import {cart, removeFromCart,updatedelopt,cartquantity} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatprice , getDateString, isWeekend} from "../util/utils.js";
import { deliveryOptions, getDelopt } from "../../data/deliveryoptions.js";
import { RenderPaymentSummary } from "./paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { updatehomelink } from "./checkoutheader.js";




export function RenderOrderSummary(){

  let htmll='';

  cart.forEach((cartitem)=>{
    const {productId,deloptid} = cartitem;

    let matchingitem = getProduct(productId);
    console.log(matchingitem);
    const {image,name,priceCents} = matchingitem;

    let delopt = getDelopt(deloptid);
    const datestring = getDateString(delopt);

    htmll+= `
      <div class="cart-item-container js-cart-item-container js-cont-id-${productId}">
      <div class="delivery-date">
        Delivery date: ${datestring}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${name}
          </div>
          <div class="product-price">
            ${matchingitem.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${matchingitem.id}">
            <span>
              Quantity: <span class="quantity-label">${cartitem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingitem.id}" data-product-id="${matchingitem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptHtml(matchingitem,cartitem)}
        </div>
      </div>
      </div>
    `;}
  )


  function deliveryOptHtml(matchingitem,cartitem){
    let html ='';
    deliveryOptions.forEach((delopt)=>{
      const datestring = getDateString(delopt);
      const pricestring = delopt.priceCents===0?'FREE':`$${formatprice(delopt.priceCents)} -`;
      const isChecked = delopt.id === cartitem.deloptid?'checked':'';

      html+=`
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingitem.id}-${delopt.id}" " data-product-id="${matchingitem.id}" data-deloptid="${delopt.id}">
          <input class="js-radio-${matchingitem.id}-${delopt.id}" type="radio"
            ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${matchingitem.id}">
          <div>
            <div class="delivery-option-date">
              ${datestring}
            </div>
            <div class="delivery-option-price">
              ${pricestring} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }


  document.querySelector('.js-order-summary').innerHTML=htmll;

  document.querySelectorAll('.js-delete-link').forEach((delink)=>{
    console.log('listenerer');
    delink.addEventListener('click',()=>{
      console.log('delete');
      const productId = delink.dataset.productId;
      removeFromCart(productId);
      const remcont = document.querySelector(`.js-cont-id-${productId}`);
      remcont.remove();
      RenderOrderSummary();
      updatehomelink();
      RenderPaymentSummary();
    });
  })

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deloptid} = element.dataset;
      updatedelopt(productId,deloptid);
      RenderOrderSummary();
      updatehomelink();
      RenderPaymentSummary();
    });
  })

  updatehomelink();
}
