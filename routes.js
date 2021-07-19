// const PersonModel = require('./model/Person');
// const PersonValidation = require('./validation/Person');
// const PersonHandler = require('./handler/Person');


// const routes = [
//     {
//         method: "POST",
//         path: "/person",
//         options: {
//             description: 'Create Person ',
//             notes: 'Create a individual person',
//             tags: ['api'],
//             validate: {
//                 payload: PersonValidation.personValidateSchema
//             },
//             handler: PersonHandler.createPerson
//         }
        
//     },


//     {
//         method: "GET",
//         path: "/people",
//         options: {
//             description: 'Get Person List',
//             notes: 'Returns Person list',
//             tags: ['api'],
//             handler: PersonHandler.getPersons
//         }
        
//     },


//     {
//         method: "GET",
//         path: "/person/{id}",
//         options: {
//             description: 'Get Individual Person ',
//             notes: 'Returns a Person by the id passed in the path',
//             tags: ['api'],
//             validate: {
//                  params:PersonValidation.personValidateId
//             },
//             handler: PersonHandler.getPersonById
//         }
       
//     },


//     {
//         method: "PUT",
//         path: "/person/{id}",
//         options: {
//             description: 'Update  Person ',
//             notes: 'Update a Person by the id passed in the path',
//             tags: ['api'],
//             validate: {
//                 params: PersonValidation.personValidateId,
//                 payload: PersonValidation.personValidateSchemaForUpdate
               
//             },
//             handler: PersonHandler.updatePerson
//         }
        
//     },


//     {
//         method: "DELETE",
//         path: "/person/{id}",
//         options: {
//             description: 'Delete Person',
//             notes: 'Delete a specific person',
//             tags: ['api'],
//             validate: {
//                 params: PersonValidation.personValidateId
//             },
//             handler: PersonHandler.deletePerson
//         }
        
//     }
// ];


// module.exports =  routes
