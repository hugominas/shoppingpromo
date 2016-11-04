# Shopping cart update

Discount provider microservice for shopping cart price update according to promotions and other business logic.

Cart item posted to internal route and replied with shopping cart totals and discount description.

Because there are no clear guidelines on how the hierarchy of promotional discounts are applied to each shopping cart request. I have made the application apply them all if each criteria is met.

However if we need to only apply one discount the change should be simple as we will just need assign a new object instead of the shared one, and then apply the rules.

## How it works

Hapijs routes validated with joi adhering to ES6 standard, Babel not required
unit test done with mocha and chai, the application is only backend and "npm run watch" for better tdd development  

Mock models are created to provide information about the customer and product to the shopping cart handler.

An array with all the applied discounts is stored in the item object. Each discount the customer is entitled to, is applied to the original price of the item, however free items are added with the promotional price.

[{name:'Amazing discount', discount: 4.96, newUnitPrice:41}, name:'Another Amazing discount', discount: 10, newUnitPrice:35.96}]

All totals are recalculated and sent back in the reply object with the property "discount".

## How to deploy

1. Clone the repo
2. Run "npm install" in the project folder
3. Edit config/server.js with your desired configurations
4. Run "node index" to run the application
5. Aplication is now running on port 3008, now you can post to /cart/ your items to be processed
6. You can also process your order like:

    const processCart = require('./controllers/shoppingCart/process');

    processCart.processItems(yourOrder).then((result) => {
      // yourOrder should be updated
    }).catch(err => console.log(err))

## How to add new filters

The shopping cart runs through all filters listed in the controllers/filters/index each filter changes the object in its way the result of the iteration is replied back.
To add a new filter you just need to:

1. create a new file inside the controllers/filters folder
2. the file should should resolve a promise when done, please follow the templateFilter.js file inside the filters folder
3. require the file inside the controllers/filter/index and add it to the exports array


## How to test

- Run "npm test" in the project folder
- Run "npm run watch" in the project folder for continues test upon file change

## TO CHECK

1. Can a customer get more than one discount?
2. Are the discounts applied to the base price of the item?
