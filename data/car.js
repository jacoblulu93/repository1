export class Car{
  brand;
  model;
  constructor(brandd,modell){
    this.brand=brandd;
    this.model=modell;
  }
}

 const car1 = new Car('toyota','Corolla');
 const car2 = new Car('tesla','Model 3');

console.log({car1,car2});