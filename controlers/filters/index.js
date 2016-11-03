'use strict';

// require your custom filter
const goodCustomer = require('./goodCustomer');
const buy5get1 = require('./buy5get1');
const lowestDiscount = require('./lowestDiscount');

//exportThem by order;
module.exports = [
  goodCustomer,
  buy5get1,
  lowestDiscount
]
