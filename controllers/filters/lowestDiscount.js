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
        //save original price
        if(!item.originalPrice)item.originalPrice = parseFloat(item['unit-price']);
        //get product category
        let productDetails = products.getById(item['product-id']);
        return (productDetails.length>0 && productDetails[0].category == this.category)
      })
      //if enough items
      if(categoryItems.length>=2){

        //sort items so that lowest price is the first applied to the updated price
        let discountItem = categoryItems.sort(function(a, b){return a['unit-price']-b['unit-price']})[0];

        //reacal unit price
        let discounted = (discountItem['unit-price']*this.discount).toFixed(2);
        discountItem['unit-price']=parseFloat((discountItem['unit-price']-discounted).toFixed(2))

        //Save object with to discount array
        let appliedDiscount = {name:this.discountName, discount: discounted, newUnitPrice:discountItem['unit-price']};

        // start new discount
        discountItem.discount = discountItem.discount ? discountItem.discount : [];
        discountItem.discount.push(appliedDiscount);

        // Change total price
        let oldTotal = discountItem.total;
        discountItem.total=discountItem['unit-price']*parseInt(discountItem.quantity);
        discountItem.total=parseFloat(discountItem.total.toFixed(2))
        //update price dif to remote from total
        newTotal = (parseFloat(oldTotal)-discountItem.total).toFixed(2);
        //update toltal
        order.total = parseFloat((order.total-newTotal).toFixed(2));
      }


    resolve(order)
  })
}



module.exports = new lowestDiscount();
