function MakeCart(key){
  const cart = {
    cartItems: undefined,
    loadfromstorage(){
      this.cartItems = JSON.parse(localStorage.getItem(key));
      if(!this.cartItems){this.cartItems=[{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deloptid:'1'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deloptid:'2'
      }];}},
      
    savetostorage(){
      console.log('SAVED');
      localStorage.setItem(key,JSON.stringify(this.cartItems));
    },

    addToCart(prodId,newquant){
      let matching;
      this.cartItems.forEach((cartitem)=>{
        if(cartitem.productId===prodId){
          console.log('item already in cart');
          matching = cartitem;
        }
      })
    
      if(matching){
        matching.quantity+=newquant;
      }
      else{this.cartItems.push({
          productId: prodId,
          quantity: newquant,
          deloptid: '1'
        });
      }
      this.savetostorage();
    },
  
    removeFromCart(prodId){
      let newcart=[];
      this.cartItems.forEach((cartitem)=>{
        console.log(prodId);
        console.log(cartitem.productId);
        if(cartitem.productId!==prodId){
          newcart.push(cartitem);
        }
      });
      console.log(newcart);
      this.cartItems = newcart;
      this.savetostorage();
    },
    
    updatedelopt(productId,deloptid){
      let matching;
      this.cartItems.forEach((cartitem)=>{
        if(cartitem.productId===productId){
          matching = cartitem;
        }
      })
      matching.deloptid = deloptid;
      this.savetostorage();
    }
  };
  return cart;
}

export function cartquantity(){
  let cartquant=0;
  cart.forEach((cartitem)=>{cartquant+=cartitem.quantity});
  return cartquant;
}
const cart = MakeCart('cartoop');
const businesscart = MakeCart('buscartoop');
cart.loadfromstorage();
businesscart.loadfromstorage();
console.log(cart);
console.log(businesscart);