const mongoose = require('mongoose');

// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['frontend developer', 'teacher', 'manager'], // User put only three type of value
        require: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: { 
        type: String,

    },
    salary: {
        type: Number,
        required: true

    }


})

// Create a Person Model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;