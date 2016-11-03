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
        //reacal unit price
        item['unit-price']=item['unit-price']-(item['unit-price']*this.discount);
        item['unit-price']=parseFloat(item['unit-price'].toFixed(2))

        //calculate from unit price
        item.total=item['unit-price']*item.quantity;
        item.total=parseFloat(item.total.toFixed(2))
        newTotal += item.total;
        item.discount = item.discount ? item.discount.push(this.discountName) : [this.discountName];
      })
      // update cart totals
      order.total = parseFloat(newTotal.toFixed(2));
    }

    resolve(order)
  })
}



module.exports = new goodCustomer();
