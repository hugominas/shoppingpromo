'use strict';


function oneextra() {

}

oneextra.prototype.processItems = function(order){
  return new Promise ((resolve,reject) => {
    resolve(order)
  })
}



module.exports = new oneextra();
