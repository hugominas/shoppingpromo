'use strict';


function lowestDiscount() {

}

lowestDiscount.prototype.processItems = function(order){
  return new Promise ((resolve,reject) => {
    resolve(order)
  })
}



module.exports = new lowestDiscount();
