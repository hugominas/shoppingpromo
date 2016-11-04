'use strict';

const Joi = require('joi');
const filters = require('../filters/');

function process() {
  this.order = {};
}

process.prototype.postRoute = function(){
  let _this = this;
  // payload rules
  return {
    validate: {
      payload: {
        order: {
          id: Joi.number().integer(),
          items: Joi.array().min(1),
          total: Joi.number(),
          'customer-id':Joi.number().integer()
        }
      }
    },
    handler: function(request, reply) {
      //update this cart info
      _this.cart = request.payload.order;
      // check items before cont
      if(_this.cart.items && _this.cart.id && _this.cart['customer-id'] && _this.cart.total){
        // process items
        _this.processItems().then((result) => {
          reply(result);
        }).catch((err) => {
          reply({status:'NOK', message:err}).code(400);
        });
      }else{
        reply({status:'NOK', message:'no items'}).code(400);

      }
    }
  };
};

process.prototype.processItems = function(order){
  let _this = this;
  return new Promise ((resolve, reject) => {
    // external access save new order
    if(!order) order = _this.cart;

    // set up properties for backup before applying filters
    _this.originalCart=Object.assign({}, order);

    let applyFilters = [];
    let newCart = order;

    // apply all filters in folder to promise array
    filters.map((runFilter) => {
      // no need to create new object Object.assign({},order)
      applyFilters.push(runFilter.processItems(newCart));
    });

    // run promises
    Promise.all(applyFilters).then((results) => {
      //process results
      //order.items = result.items;
      //order.total = result.total;
      resolve(newCart);
    });



  });
};



module.exports = new process();
