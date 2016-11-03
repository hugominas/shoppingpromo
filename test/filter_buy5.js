'use strict';

const chai = require('chai');
const server = require('../');
const buy5get1 = require('../controlers/filters/buy5get1');

// Using Expect style
let expect = chai.expect;

describe('test good buy 6 get one free discount', () => {

  it('post order to cart with 10 items ', (done) => {
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
                "quantity": "11",
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
      let found = false

      payload.items[0].discount.map((itemDiscount)=>{
        if(itemDiscount.name==buy5get1.discountName)found=true;
      })

      expect(found).to.be.true;
      expect(payload.total).to.equal(parseFloat(payload.items[0].total + payload.items[1].total))


      done();
    });

  });
  it('post order to cart with only 5 items', (done) => {
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
                  "quantity": "4",
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

      let found = false

      if(payload.items[0].discount){
        payload.items[0].discount.map((itemDiscount)=>{
          if(itemDiscount.name==buy5get1.discountName)found=true;
        })
      }

      expect(found).to.be.false;
      expect(payload.total).to.equal(parseFloat(payload.items[0].total))

      done();
      // WE ARE ALL DON SERVER
      server.stop();
    });

  });

    it('post order to cart with 10 items of wrong category', (done) => {
      let optionItems3 = {
        method: 'POST',
        url: '/cart',
        payload:{
            order:{
              "id": "1",
              "customer-id": "2",
              "items": [
                {
                  "product-id": "A102",
                  "quantity": "11",
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

        let found = false;

        if(payload.items[0].discount){
          payload.items[0].discount.map((itemDiscount)=>{
            if(itemDiscount.name==buy5get1.discountName)found=true;

          })
        }
        //manual check
        expect(payload.total).to.equal(parseFloat((payload.items[0].total + payload.items[1].total).toFixed(2)))
        expect(found).to.be.false;

        done();
      });

    });
});
