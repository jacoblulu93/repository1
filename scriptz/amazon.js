import {cart, addToCart, cartquantity} from "../data/cart.js";
import {products, LoadProducts} from "../data/products.js";
import { checkkeywords } from "./util/utils.js";


LoadProducts(RenderHomePage);
console.log('CHECK: '+checkkeywords(["women","men","ran","ooo"],"men"));

function RenderHomePage(){

  document.querySelector('.search-button').addEventListener('click',()=>{
    const searchvalue = document.querySelector('.search-bar').value;
    console.log(searchvalue);
    window.location.href = `amazon.html?search=${searchvalue}`;
    // console.log(window.location.href.searchParams.get('search'))
  });
  // const searchvalue = document.querySelector('.search-bar').value;
  // document.querySelector('.search-button').href = `amazon.html?search=${searchvalue}`;
  // console.log(document.querySelector('.search-button').href);
  
  let prodhtml = '';
  products.forEach((product)=>{
    const {image,name,rating,priceCents,id} = product;
    const searchval = (new URL(window.location.href)).searchParams.get('search');
    // console.log(product.keywords);
    // console.log(searchval+' '+name);
    // console.log(name.toUpperCase().includes(searchval.toUpperCase()));

    if(name.toUpperCase().includes(searchval.toUpperCase()) || checkkeywords(product.keywords,searchval)){
    prodhtml += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class ="js-quantity-selector-${id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHtml()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-${id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${id}">
          Add to Cart
        </button>
      </div>
    `}
  });

  function updatecartqty(){
    document.querySelector('.js-cart-quantity').innerHTML = cartquantity();
  }

  const prodgrid = document.querySelector('.js-products-grid');
  prodgrid.innerHTML = prodhtml;

  document.querySelectorAll('.js-add-to-cart')
  .forEach((butt)=>{
    let addedmessagetime;
    butt.addEventListener('click',()=>{ 
      const {productId} = butt.dataset;
      const newquant = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value);
      addToCart(productId,newquant);
      console.log(cart);
      updatecartqty();
      
      // 'Added' message
      if(addedmessagetime){clearTimeout(addedmessagetime)};
      const addd = document.querySelector(`.js-added-${productId}`);
      addd.classList.add('added-active');
      const timeoutid=setTimeout(()=>{addd.classList.remove('added-active');},2000);
      addedmessagetime = timeoutid;
    })
  });

  updatecartqty();
}
