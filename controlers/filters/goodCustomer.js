'use strict';

const customers = require('../../models/customers')

function goodCustomer() {

}

goodCustomer.prototype.processItems = function(order){
  return new Promise ((resolve,reject) => {

    resolve(order)
  })
}



module.exports = new goodCustomer();
