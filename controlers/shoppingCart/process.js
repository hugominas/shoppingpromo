'use strict';

const Joi = require('joi');

function process() {

}

process.prototype.postRoute = function(){
  let _this = this;
  return {
    validate: {
        params: {
          data:{
            items: Joi.array(),
          }
        }
    },
    handler: function(request, reply) {
      reply('got here')
    }
  }
} 

module.exports = new process();
