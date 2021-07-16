const Hapi = require('@hapi/hapi');
const Mongoose = require("mongoose");
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Pack = require('./package');
const HapiSwagger = require('hapi-swagger');
const routes = require('./routes');


(async () => {
    const server = await new Hapi.Server({
        "host": "localhost",
        "port": 3000
    });

    Mongoose.connect("mongodb://localhost/myhapidb", { useUnifiedTopology: true, useNewUrlParser: true });


    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);


    server.route(routes);

    server.start();

})();