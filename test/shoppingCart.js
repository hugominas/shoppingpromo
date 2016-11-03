'use strict';

const chai = require('chai');
const server = require('../app_discCart');

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

  it('post order to cart good customer discount > €1000', (done) => {
    let optionItems3 = {
      method: 'POST',
      url: '/cart',
      payload:{
          order:{
            "id": "1",
            "customer-id": "2",
            "items": [
              {
                "product-id": "B102",
                "quantity": "10",
                "unit-price": "4.99",
                "total": "49.90"
              },
              {
                "product-id": "A102",
                "quantity": "1",
                "unit-price": "49.50",
                "total": "49.50"
              }
            ],
            "total": "99.4"
          }
      }
    };
    server.inject(optionItems3, (response) => {
      let payload = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(payload.total).to.equal(89.46);
      done();
      // WE ARE ALL DON SERVER
      server.stop();
    });

  });
  it('post order to cart of not good customer so no discount', (done) => {
    let optionItems3 = {
      method: 'POST',
      url: '/cart',
      payload:{
          order:{
              "id": "2",
              "customer-id": "1",
              "items": [
                {
                  "product-id": "B102",
                  "quantity": "5",
                  "unit-price": "4.99",
                  "total": "24.95"
                }
              ],
              "total": "24.95"
          }
      }
    };
    server.inject(optionItems3, (response) => {
      let payload = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(payload.total).to.equal(24.95);
      done();
      // WE ARE ALL DON SERVER
      server.stop();
    });

  });

});
