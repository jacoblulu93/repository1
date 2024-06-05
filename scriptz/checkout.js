import {RenderOrderSummary} from "./checkout/orderSummary.js";
import { RenderPaymentSummary } from "./checkout/paymentSummary.js";
import {LoadProducts,LoadProductsFetch} from "../data/products.js";
// import '../data/car.js';
// import '../data/cartoop.js';
import '../data/backendpractice.js'

Promise.all([
  LoadProductsFetch(),
  new Promise((resolve)=>{
    console.log('loaded products!');
    resolve();
  })
]).then(()=>{
  RenderOrderSummary();
  RenderPaymentSummary();
});

// const xhr = new XMLHttpRequest;
// xhr.open('GET',"https://www.amazon.com/");
// xhr.send();

// new Promise((resolve)=>{
//   LoadProducts(()=>{
//     resolve();
//   })
// }).then(()=>{
//   RenderOrderSummary();
//   RenderPaymentSummary();
// });


// LoadProducts(()=>{
//   RenderOrderSummary();
//   RenderPaymentSummary();
// });
