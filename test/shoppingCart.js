'use strict';

const chai = require('chai');
const server = require('../');
const processCart = require('../controllers/shoppingCart/process');
const goodCustomer = require('../controllers/filters/goodCustomer');

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

  it('can use process items function directly', (done) => {
    let order = {
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
    };

    processCart.processItems(order).then((result) => {
      let found = false;

      result.items[0].discount.map((itemDiscount)=>{
        if(itemDiscount.name==goodCustomer.discountName)found=true;
      })

      expect(found).to.be.true;
      expect(result.total).to.equal((result.items[0].total + result.items[1].total))
      done();


    }).catch(err => console.log(err))

  });

});
