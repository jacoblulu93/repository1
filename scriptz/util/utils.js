import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function formatprice(cents){
  return (Math.round(cents)/100).toFixed(2);
}
export function isWeekend(date){
  return (date.format('ddd')==='Sun'||date.format('ddd')==='Sat');
}
export function getDateString(option){
  const today = dayjs();
  let deldate = today;
  let {deldays} = option;
  while(deldays>0){
    deldate = deldate.add(1,'days');
    if(!isWeekend(deldate)){deldays--};
  } 
  const datestring = deldate.format('dddd, MMMM D');
  return datestring;
}

export function formatDateString(){}

export function checkkeywords(keywords,search){
  if(keywords){
  for(let i = 0; i < keywords.length; i++){
    if(keywords[i].toUpperCase().includes(search.toUpperCase())){
      return true;
    }
  }}
  return false;
}