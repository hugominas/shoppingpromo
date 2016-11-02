# Shopping cart update

Routes provider microservice for shopping cart price update according to promotions and other business logic.
Cart item posted to internal route and replied with shopping cart totals and promotion description


## How it works

Hapijs routes validated with joi adhering to ES6 standars, Babel not required
unit test done with mocha and chai, the application is only backend and "npm run watch" for better tdd develoment  

Mock models are created to provide information about the customer and product to the shopping cart handler.

## How to deploy

1. Clone the repo
2. Run "npm install" in the project folder
3. Run "node app_discCart" to run the application
4. Aplication is now running on port 3008, now you can post to /cart/ your items to be processed

## How to test

- Run "npm test" in the project folder
- Run "npm run watch" in the project folder for countinus test upon file change
- Run "npm run lint" for lint test output
