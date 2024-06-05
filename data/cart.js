export let cart;

loadfromstorage();

export function loadfromstorage(){cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){cart=[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deloptid:'1'
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deloptid:'2'
}];}}

export function cartquantity(){
  let cartquant=0;
  cart.forEach((cartitem)=>{cartquant+=cartitem.quantity});
  return cartquant;
}

function savetostorage(){
  console.log('SAVED');
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(prodId,newquant){
  let matching;
  cart.forEach((cartitem)=>{
    if(cartitem.productId===prodId){
      console.log('item already in cart');
      matching = cartitem;
    }
  })

  if(matching){
    matching.quantity+=newquant;
  }
  else{cart.push({
      productId: prodId,
      quantity: newquant,
      deloptid: '1'
    });
  }
  savetostorage();
}

export function removeFromCart(prodId){
  let newcart=[];
  cart.forEach((cartitem)=>{
    console.log(prodId);
    console.log(cartitem.productId);
    if(cartitem.productId!==prodId){
      newcart.push(cartitem);
    }
  });
  console.log(newcart);
  cart = newcart;
  savetostorage();
}

export function updatedelopt(productId,deloptid){
  let matching;
  cart.forEach((cartitem)=>{
    if(cartitem.productId===productId){
      matching = cartitem;
    }
  })
  matching.deloptid = deloptid;
  savetostorage();
}