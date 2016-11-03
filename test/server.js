'use strict';

const chai = require('chai');
const server = require('../app_discCart');

// Using Expect style
let expect = chai.expect;

describe('check if server run succefully', () => {

  it('server started', (done) => {
    expect(server).to.have.property('info');
    expect(server.info).to.have.property('port');
    done();
  });

  it('visit homepage', (done) => {
    let visitOption = {
      method: 'GET',
      url: '/'
    };
    server.inject(visitOption, (response) => {
      expect(response.statusCode).to.equal(404);
      expect(response.statusMessage).to.equal('Not Found');
      done();
    });
  });

  it('post items to cart route', (done) => {
    let optionItems = {
      method: 'POST',
      url: '/cart',
      payload:{
          order:{}
      }
    };
    server.inject(optionItems, (response) => {
      expect(response.statusCode).to.equal(400);
      done();
      // WE ARE ALL DON SERVER
      server.stop();
    });
  });
});
