'use strict';


function template() {

}

template.prototype.processItems = function(order){
  return new Promise ((resolve, reject) => {

    //Save object with to discount array
    let appliedDiscount = {goodCustomer:this.discountName, discount: '', newUnitPrice:''};

    resolve(order);
  });
};



module.exports = new template();
