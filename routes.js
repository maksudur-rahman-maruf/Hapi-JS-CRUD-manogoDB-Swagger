const PersonModel = require('./model/Person');
const PersonValidation = require('./validation/Person');


const routes = [
    {
        method: "POST",
        path: "/person",
        options: {
            description: 'Create Person ',
            notes: 'Create a individual person',
            tags: ['api'],
            validate: {
                payload: PersonValidation.personValidateSchema
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
        
    },


    {
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
        
    },


    {
        method: "GET",
        path: "/person/{id}",
        options: {
            description: 'Get Individual Person ',
            notes: 'Returns a Person by the id passed in the path',
            tags: ['api'],
            validate: {
                 params:PersonValidation.personValidateId
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
       
    },


    {
        method: "PUT",
        path: "/person/{id}",
        options: {
            description: 'Update  Person ',
            notes: 'Update a Person by the id passed in the path',
            tags: ['api'],
            validate: {
                params: PersonValidation.personValidateId,
                payload: PersonValidation.personValidateSchemaForUpdate
               
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
        
    },


    {
        method: "DELETE",
        path: "/person/{id}",
        options: {
            description: 'Delete Person',
            notes: 'Delete a specific person',
            tags: ['api'],
            validate: {
                params: PersonValidation.personValidateId
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
        
    }
];


module.exports =  routes
