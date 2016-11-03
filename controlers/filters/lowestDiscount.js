'use strict';

const products = require('../../models/products')

function lowestDiscount() {
  this.discount = 0.20;
  this.category    = 1; //switches
  this.discountName = "Special Category 20% off"
}

lowestDiscount.prototype.processItems = function(order){
  return new Promise ((resolve,reject) => {
      let newTotal = 0;

      //filter items to just of the currect cat
      let categoryItems = order.items.filter((item)=>{
        let productDetails = products.getById(item['product-id']);
        return (productDetails.category == this.category)
      })

      //if enough items
      if(categoryItems.lenght>=2){
        //sort items so that lowest price is the first
        let discountItem = categoryItems.sort(function(a, b){return b['unit-price']-a['unit-price']})[0];
        //apply discount
        discountItem['unit-price']=discountItem['unit-price']-(discountItem['unit-price']*this.discount);
        discountItem.discount = discountItem.discount ? discountItem.discount.push(this.discountName) : [this.discountName];
        let oldTotal = discountItem.total;
        discountItem.total=discountItem['unit-price']*discountItem.quantity;
        discountItem.total=parseFloat(discountItem.total.toFixed(2))
        //update price dif to remote from total
        newTotal = oldTotal-discountItem.total;
        //update toltal
        order.total = parseFloat(newTotal.toFixed(2));
      }

    
    resolve(order)
  })
}



module.exports = new lowestDiscount();
