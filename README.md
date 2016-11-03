# Shopping cart update

Routes provider microservice for shopping cart price update according to promotions and other business logic.
Cart item posted to internal route and replied with shopping cart totals and promotion description


## How it works

Hapijs routes validated with joi adhering to ES6 standars, Babel not required
unit test done with mocha and chai, the application is only backend and "npm run watch" for better tdd develoment  

Mock models are created to provide information about the customer and product to the shopping cart handler.

## How to add new filters

The shopping cart runs through all filters listed in the controlers/filters/index each filter changes the object in its way the result of the iteration is replied back.
To add a new filter you just need to:

1. create a new file inside the controlers/filters folder
2. the file should should resolve a promisse when done, please follow the templateFilter.js file inside the filters folder
3. require the file inside the controlers/filter/index and add it to the exports array

## How to deploy

1. Clone the repo
2. Run "npm install" in the project folder
3. Edit config/server.js with your desired configurations
4. Run "node app_discCart" to run the application
5. Aplication is now running on port 3008, now you can post to /cart/ your items to be processed

## How to test

- Run "npm test" in the project folder
- Run "npm run watch" in the project folder for countinus test upon file change
- Run "npm run lint" for lint test output

## TO CHECK

1. Can a customer get more than one discount?
2. Are the discounts applied to the base price of the item?
