import { orders } from "../data/ordersbackend.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cartquantity,addToCart } from "../data/cart.js";
import { formatprice } from "./util/utils.js";
import { LoadProductsFetch, getProduct } from "../data/products.js";

console.log('Order Placed: '+dayjs(`${orders[0].orderTime}`).format('D MMMM YYYY'));

function RenderOrderContainer(){
  let htmll='';
  orders.forEach((order)=>{
    const {id,orderTime,products,totalCostCents} = order;
    console.log(products);
    let gridhtml='';
    products.forEach((product)=>{
      const {estimatedDeliveryTime,productId,quantity} = product;
      
      const {image,name} = getProduct(productId);

      gridhtml+=`
      <div class="product-image-container">
         <img src="${image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${dayjs(`${estimatedDeliveryTime}`).format('D MMMM YYYY')}
            </div>
            <div class="product-quantity">
              Quantity: ${quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productId}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?productId=${productId}&orderId=${id}">
              <button class="track-package-button button-secondary js-track-package-button" data-product-id="${productId}" data-delivery-Id="${id}">
                Track package
              </button>
            </a>
          </div>
      `;
    });
    console.log(gridhtml);
    htmll+=`<div class="order-container">
          
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${dayjs(`${orderTime}`).format('D MMMM YYYY')}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatprice(totalCostCents)}</div>
        </div>
      </div>
  
      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${id}</div>
      </div>
    </div>
  
    <div class="order-details-grid">
      ${gridhtml}
    </div>
  </div>
    `
  });
  
  document.querySelector('.orders-grid').innerHTML=htmll;
  document.querySelectorAll('.js-buy-again-button').forEach((button)=>{
    button.addEventListener('click',()=>{
      const {productId} = button.dataset;
      addToCart(productId,1);
      updatecartqty();
    })
  });
}
function updatecartqty(){
  document.querySelector('.js-cart-quantity').innerHTML = cartquantity();
}

LoadProductsFetch().then(()=>{
  console.log('Rendering Orders');
  RenderOrderContainer();
  updatecartqty();
})
