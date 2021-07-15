const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const Mongoose = require("mongoose");
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Schema = Mongoose.Schema;

(async () => {
    const server = await new Hapi.Server({ 
        "host": "localhost",
        "port": 3000
    });

Mongoose.connect("mongodb://localhost/myhapidb", { useUnifiedTopology: true, useNewUrlParser: true });

const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
});

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

// Create a Person
server.route({
    method: "POST",
    path: "/person",
    options: {
        description: 'Create Person ',
        notes: 'Create a individual person',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstname: Joi.string().min(3).required(),
                lastname: Joi.string().required()
            }),
            failAction: (request, h, error) => {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
            }
        },
        handler: async (request, h) => {
            try {
                var person = new PersonModel(request.payload);
                var result = await person.save();
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }

    }
    
});

// Show the list of People
server.route({
    method: "GET",
    path: "/people",
    options: {
        description: 'Get Person List',
        notes: 'Returns Person list',
        tags: ['api'],
        handler: async (request, h) => {
            try {
                var person = await PersonModel.find().exec();
                return h.response(person);
            } catch (error) {
                return h.response(error).code(500);
    
            }
        }
    }
    
});

// Show single Person
server.route({
    method: "GET",
    path: "/person/{id}",
    options: {
        description: 'Get Individual Person ',
        notes: 'Returns a Person by the id passed in the path',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id : Joi.string()
                        .required()
                        .min(24)
                        .max(24)
                        .description('the id for the person object'),
            }),
            failAction: (request, h, error) => {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
            }
        },
        handler: async (request, h) => {
            try {
                var person = await PersonModel.findById(request.params.id).exec();
                return h.response(person);
                
            } catch (error) {
                return h.response({
                    "statusCode": 500,
                    "error": "Internal Server Error!",
                    "message": error.message
                }).code(500);
                // return h.response(error).code(500);
            }
        }
    }
   
});

// Update a Person
server.route({
    method: "PUT",
    path: "/person/{id}",
    options: {
        description: 'Update  Person ',
        notes: 'Update a Person by the id passed in the path',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id : Joi.string()
                        .required()
                        .min(24)
                        .max(24)
                        .description('the id for the person object'),
            }),
            payload: Joi.object({
                firstname: Joi.string().min(3).required(),
                lastname: Joi.string().required()
            }),
            failAction: (request, h, error) => {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
            }
        },
        handler: async (request, h) => {
            try {
                var result = await PersonModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    }
    
});

// Delete a Person
server.route({
    method: "DELETE",
    path: "/person/{id}",
    options: {
        description: 'Delete Person',
        notes: 'Delete a specific person',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id : Joi.string()
                        .required()
                        .min(24)
                        .max(24)
                        .description('the id for the person object'),
            }),
            failAction: (request, h, error) => {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
            }
        },
        handler: async (request, h) => {
            try {
                var result = await PersonModel.findByIdAndDelete(request.params.id);
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    }
    
});


    server.start();

})();