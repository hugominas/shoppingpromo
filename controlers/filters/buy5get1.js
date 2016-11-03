'use strict';

const products = require('../../models/products')

function oneextra() {
  this.category    = 2; //switches
  this.discountName = "6th item free"
}

oneextra.prototype.processItems = function(order){
  return new Promise ((resolve,reject) => {
      let newTotal = 0;

      //check product cats
      order.items.map((item)=>{
        let productDetails = products.getById(item['product-id']);
        if(productDetails.category == this.category){
          //get the number of items to discount from price
          let totalToDiscount = parseInt((item.quantity/5));
          let totalDiscount = totalToDiscount*item['unit-price'];
          //reacal unit price
          item.total=item.total-totalDiscount;
          item.total=parseFloat(item.total.toFixed(2))
          item.discount = item.discount ? item.discount.push(this.discountName) : [this.discountName];
        }
        //rework total
        newTotal += parseInt(item.total);
      })
      // update cart totals
      order.total = parseFloat(newTotal.toFixed(2));


    resolve(order)
  })
}



module.exports = new oneextra();
