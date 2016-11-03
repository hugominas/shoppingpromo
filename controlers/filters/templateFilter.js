'use strict';


function template() {

}

goodCustomer.prototype.template = function(order){
  return new Promise ((resolve,reject) => {
    //save original price
    if(!item.originalPrice)item.originalPrice = parseFloat(item['unit-price']);

    //Save object with to discount array
    let appliedDiscount = {goodCustomer:this.discountName, discount: discounted, newUnitPrice:item['unit-price']};
    item.discount = item.discount ? item.discount.push(appliedDiscount) : [appliedDiscount];

    resolve(order)
  })
}



module.exports = new template();
