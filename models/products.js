'use strict';

function products() {
  this.readDbFile().then((data)=>{
    if(data){
      this.products=data||[];
    }
  });
}

products.prototype.getById = function(id){
  return this.products.filter((prod) => {
    return (id == prod.id)
  })
}

products.prototype.getByCatId = function(id){
  return this.products.filter((prod) => {
    return (id == prod.category)
  })
}


products.prototype.readDbFile = function(file){
  return new Promise ((resolve,reject) => {
    resolve([
      {
        "id": "A101",
        "description": "Screwdriver",
        "category": "1",
        "price": "9.75"
      },
      {
        "id": "A102",
        "description": "Electric screwdriver",
        "category": "1",
        "price": "49.50"
      },
      {
        "id": "B101",
        "description": "Basic on-off switch",
        "category": "2",
        "price": "4.99"
      },
      {
        "id": "B102",
        "description": "Press button",
        "category": "2",
        "price": "4.99"
      },
      {
        "id": "B103",
        "description": "Switch with motion detector",
        "category": "2",
        "price": "12.95"
      }
    ])
  })
}

module.exports = new products();
