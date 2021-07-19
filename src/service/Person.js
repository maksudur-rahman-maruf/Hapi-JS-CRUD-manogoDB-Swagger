const PersonModel = require('../model/Person');

const createPersonService = async (request) => {
    try {
        let person = new PersonModel(request.payload);
        let result = await person.save();
        return result;
    } catch (error) {
        return h.response(error).code(500);
    }
};


const getPersonListService = async (request) => {
    try {
        let persons = await PersonModel.find().exec();
        return persons;
    } catch (error) {
        return h.response(error).code(500);
    }
};


const getPersonService = async (request) => {
    try {
        let person = await PersonModel.findById(request.params.id).exec();
        return person;
    } catch (error) {
        return h.response({
            "statusCode": 500,
            "error": "Internal Server Error!",
            "message": error.message
        }).code(500);
    }
};


const updatePersonService = async (request) => {
    try {
        let person = await PersonModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
        return person;
    } catch (error) {
        return h.response(error).code(500);
    }
};


const deletePersonService = async (request) => {
    try {
        var person = await PersonModel.findByIdAndDelete(request.params.id);
        return person;
    } catch (error) {
        return h.response(error).code(500);
    }
};




module.exports = {
    createPersonService,
    getPersonListService,
    getPersonService,
    updatePersonService,
    deletePersonService
}
