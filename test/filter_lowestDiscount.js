'use strict';

const chai = require('chai');
const server = require('../');
const lowestDiscount = require('../controllers/filters/lowestDiscount');

// Using Expect style
let expect = chai.expect;

describe('test Special Category 20% off', () => {

  it('post order to cart with 1 item for the category', (done) => {
    let optionItems3 = {
      method: 'POST',
      url: '/cart',
      payload:{
          order:{
            "id": "1",
            "customer-id": "1",
            "items": [
              {
                "product-id": "A102",
                "quantity": "1",
                "unit-price": "49.90",
                "total": "49.90"
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

      if(payload.items[0].discount){
        payload.items[0].discount.map((itemDiscount)=>{
          if(itemDiscount.name==lowestDiscount.discountName)found=true;
        })
      }

      expect(found).to.be.false;
      expect(payload.total).to.equal(parseFloat(payload.items[0].total));

      done();
    });
  });

  it('post order to cart with 5 items but only one product for the category', (done) => {
    let optionItems3 = {
      method: 'POST',
      url: '/cart',
      payload:{
          order:{
              "id": "2",
              "customer-id": "1",
              "items": [
                {
                  "product-id": "A102",
                  "quantity": "5",
                  "unit-price": "49.50",
                  "total": "247.50"
                }
              ],
              "total": "247.50"
          }
      }
    };
    server.inject(optionItems3, (response) => {
      let payload = JSON.parse(response.payload);

      expect(response.statusCode).to.equal(200);

      let found = false

      if(payload.items[0].discount){
        payload.items[0].discount.map((itemDiscount)=>{
          if(itemDiscount.name==lowestDiscount.discountName)found=true;
        })
      }
      expect(found).to.be.false;
      expect(payload.total).to.equal(parseFloat(payload.items[0].total))

      done();
    });

  });


  it('post order to cart with 10 items between 2 different products for the category', (done) => {
    let optionItems3 = {
      method: 'POST',
      url: '/cart',
      payload:{
          order:{
              "id": "2",
              "customer-id": "1",
              "items": [
                {
                  "product-id": "A102",
                  "quantity": "5",
                  "unit-price": "49.50",
                  "total": "247.50"
                },
                {
                  "product-id": "A101",
                  "quantity": "5",
                  "unit-price": "49.90",
                  "total": "249.50"
                }
              ],
              "total": "497"
          }
      }
    };
    server.inject(optionItems3, (response) => {
      let payload = JSON.parse(response.payload);

      expect(response.statusCode).to.equal(200);

      let found = false
      if(payload.items[0].discount){
        payload.items[0].discount.map((itemDiscount)=>{
          if(itemDiscount.name==lowestDiscount.discountName)found=true;
        })
      }
      expect(found).to.be.true;
      expect(optionItems3.payload.order.total).to.be.above(payload.total)
      expect(payload.total).to.equal(parseFloat((parseFloat(payload.items[0].total)+parseFloat(payload.items[1].total)).toFixed(2)))

      done();
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
                  "product-id": "B102",
                  "quantity": "11",
                  "unit-price": "4.99",
                  "total": "49.90"
                },
                {
                  "product-id": "B102",
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
            if(itemDiscount.name==lowestDiscount.discountName)found=true;

          })
        }
        //manual check
        expect(payload.total).to.equal(parseFloat(payload.items[0].total + payload.items[1].total));
        expect(found).to.be.false;

        done();


              // WE ARE ALL DON SERVER
              server.stop();

        });
    });

});
