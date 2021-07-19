const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
});

module.exports = PersonModel;