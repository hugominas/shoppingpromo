'use strict';

const chai = require('chai');
const server = require('../');

// Using Expect style
let expect = chai.expect;

describe('order process', () => {
  it('post order with no id', (done) => {
    let optionItems1 = {
      method: 'POST',
      url: '/cart',
      payload:{
          order:{
            "customer-id": "1",
            "items": [
              {
                "product-id": "B102",
                "quantity": "10",
                "unit-price": "4.99",
                "total": "49.90"
              }
            ],
            "total": "49.90"
          }
      }
    };
    server.inject(optionItems1, (response) => {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  it('post order with empty cart', (done) => {
    let optionItems2 = {
      method: 'POST',
      url: '/cart',
      payload:{
          order:{
            "id": "1",
            "customer-id": "1",
            "items": [],
            "total": ""
          }
      }
    };
    server.inject(optionItems2, (response) => {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

});
