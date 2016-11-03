'use strict';

const products = require('../../models/products');

function oneextra() {
  this.category = 2; //switches
  this.discountName = '6th item free';
}

oneextra.prototype.processItems = function(order){
  return new Promise ((resolve, reject) => {
    let newTotal = 0;

    if (order.items.length==0) { reject(); }

    //check product cats
    order.items.map((item) => {

      let productDetails = products.getById(item['product-id']);

      if(item.quantity > 5 && productDetails.length>0 && productDetails[0].category == this.category){

        //Save original price
        if(!item.originalPrice)item.originalPrice = parseFloat(item['unit-price']);

        //get the number of items to discount from price
        let totalToDiscount = item.quantity/5;
        // Only apply discount on 6th item
        totalToDiscount = parseInt((totalToDiscount % 1 === 0) ? totalToDiscount-1 : totalToDiscount)

        //generate total discount amount
        // not from original price as this will impact the global price
        let totalDiscount = (totalToDiscount*item['unit-price']).toFixed(2);

        //reacal unit price
        item.total=item.total-totalDiscount;
        item.total=parseFloat(item.total.toFixed(2))

        //Save object with to discount array
        let appliedDiscount = {name:this.discountName, discount: totalDiscount, newUnitPrice:item['unit-price']};
        //init discount
        item.discount = item.discount ? item.discount : [];
        item.discount.push(appliedDiscount);



      }
      //rework total
      newTotal += parseFloat(item.total);
    })
    // update cart totals
    order.total = parseFloat(newTotal.toFixed(2));


  resolve(order)
})
}



module.exports = new oneextra();
