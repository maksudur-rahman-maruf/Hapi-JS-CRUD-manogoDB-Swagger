const PersonModel = require('../model/Person');

const createPersonService = async (request) => {
    try {
        let person = new PersonModel(request.payload);
        return await person.save();
       
    } catch (error) {
        return h.response(error).code(500);
    }
};


const getPersonListService = async (request) => {
    try {
        return await PersonModel.find().exec();
    } catch (error) {
        return h.response(error).code(500);
    }
};


const getPersonService = async (request) => {
    try {
        return await PersonModel.findById(request.params.id).exec();
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
        return await PersonModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
    } catch (error) {
        return h.response(error).code(500);
    }
};


const deletePersonService = async (request) => {
    try {
        return await PersonModel.findByIdAndDelete(request.params.id);
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
