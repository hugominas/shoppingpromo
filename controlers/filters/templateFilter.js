'use strict';


function template() {

}

goodCustomer.prototype.template = function(order){
  return new Promise ((resolve,reject) => {

    resolve(order)
  })
}



module.exports = new template();
