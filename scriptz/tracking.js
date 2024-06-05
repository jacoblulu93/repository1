import { orders, getOrder } from "../data/ordersbackend.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cartquantity,addToCart } from "../data/cart.js";
import { formatprice } from "./util/utils.js";
import { LoadProductsFetch, getProduct } from "../data/products.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

console.log(orderId);
console.log(productId);

const order = getOrder(orderId);

LoadProductsFetch().then(()=>{RenderTracking()});

function RenderTracking(){
  const {name,image} = getProduct(productId);

  console.log(order.products);
  let prodct;
  order.products.forEach((prod)=>{
    if(prod.productId===productId){
      prodct=prod;
    }
  });
  console.log(prodct);
  const {estimatedDeliveryTime,quantity} = prodct;

  const percent = 100*dayjs().diff(dayjs(`${order.orderTime}`))/dayjs(`${estimatedDeliveryTime}`).diff(dayjs(`${order.orderTime}`));
  console.log(percent);

  let htmll = '';
  htmll+=`
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${dayjs(`${estimatedDeliveryTime}`).format('D MMMM YYYY')}
    </div>

    <div class="product-info">
      ${name}
    </div>

    <div class="product-info">
      Quantity: ${quantity}
    </div>

    <img class="product-image" src="${image}">

    <div class="progress-labels-container">
      <div class="progress-label ${percent<50?'current-status':''}">
        Preparing
      </div>
      <div class="progress-label ${percent<100&&percent>50?'current-status':''}">
        Shipped
      </div>
      <div class="progress-label ${percent>100?'current-status':''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style = "width:${percent}%"></div>
    </div>`
  document.querySelector('.js-order-tracking').innerHTML = htmll;
}