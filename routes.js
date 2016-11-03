'use strict';

const ShoppingCart = require('./controllers/shoppingCart/process');

// endpoints for cart update
exports.endpoints = [
	{
		method: ['POST'],
		path: '/cart/{id?}',
		config: ShoppingCart.postRoute()
	}    // Should get the ID from session allowing on the path for now
];
