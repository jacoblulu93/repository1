export const deliveryOptions = [
  {
    id:'1',
    deldays:'7',
    priceCents:0
  },
  {
    id:'2',
    deldays:'3',
    priceCents:499
  },
  {
    id:'3',
    deldays:'1',
    priceCents:999
  }
];

export function getDelopt(deloptid){
  let matchingdeliv;
  deliveryOptions.forEach(delopt=>{
  if(delopt.id===deloptid){
    console.log('RIGHT'+delopt.priceCents);
    matchingdeliv=delopt;
  }});
  return matchingdeliv || deliveryOptions[0];
  }