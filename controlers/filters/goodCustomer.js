'use strict';

const customers = require('../../models/customers')

function goodCustomer() {
  this.discount     = 0.10;
  this.above        = 1000;
  this.discountName = 'Valued Customer';
}

goodCustomer.prototype.processItems = function(order){
  return new Promise ((resolve,reject) => {
    this.customer = customers.getById(order['customer-id'])

    if(this.customer[0] && this.customer[0].revenue > this.above){
      let newTotal = 0;
      //apply discount
      order.items.map((item)=>{
        //save original price
        if(!item.originalPrice)item.originalPrice = parseFloat(item['unit-price']);

        //reacal unit price
        let discounted = (item.originalPrice*this.discount).toFixed(2);
        item['unit-price']=parseFloat((item['unit-price']-discounted).toFixed(2))

        //calculate from unit price
        item.total=item['unit-price']*item.quantity;
        item.total=parseFloat(item.total.toFixed(2))

        newTotal += item.total;

        //Save object with to discount array
        let appliedDiscount = {name:this.discountName, discount: discounted, newUnitPrice:item['unit-price']};
        item.discount = item.discount ? item.discount.push(appliedDiscount) : [appliedDiscount];

      })
      // update cart totals
      order.total = parseFloat(newTotal.toFixed(2));
    }

    resolve(order)
  })
}



module.exports = new goodCustomer();
