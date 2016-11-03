'use strict';
const Hapi 		= require("hapi");
const routes 	= require('./routes');
const config 	= require('./config/server');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: config.host,
    port: config.port
});

// Service Routes
server.route(routes.endpoints);

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('✓ Server running at:', server.info.uri);
});

module.exports = server;
