'use strict';

const Joi = require('joi');

function process() {
  this.order = {}
}

process.prototype.postRoute = function(){
  let _this = this;
  // payload rules
  return {
    validate: {
        payload: {
          data:{
            id: Joi.number().integer().greater(0),
            order: {
              items: Joi.array().min(1),
              'customer-id':Joi.number().integer().greater(0)
            }
          }
        }
    },
    handler: function(request, reply) {
      //update this cart info
      _this.cart = request.payload.data;
      // process items
      _this.processItems().then((result)=>{
        reply(result);
      }).catch((err)=>{
        reply({status:'NOK', message:err})
      });
    }
  }
}

process.prototype.processItems = function(){
  let _this = this;
  return new Promise ((resolve,reject) => {

    // set up properties for this cart
    this.customer = this.cart.order['customer-id'];
    this.orderId = this.cart.id;
    this.items = this.cart.order.items;
    this.total = this.cart.order.total;

    _this.processFilters().then((result)=>{

    })


    resolve();
  })
}

process.prototype.processFilters = function(){
  return new Promise ((resolve,reject) => {

  })
}



module.exports = new process();
