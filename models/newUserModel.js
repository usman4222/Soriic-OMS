const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name..."],
        maxLength: [20, "Name should'nt exceed more than 20 characters"],
    },
    fatherName: {
        type: String,
        required: [true, "Please Enter Father Name"],
        maxLength: [20, "Name should'nt exceed more than 20 characters"],
    },
    phone: {
        type: Number,
        required: [true, "Please Enter your phone number"]
    },
    address: {
        type: String,
        required: [true, "Please Enter your Address"]
    },
    role: {
        type: String,
        required: [true, "Please define user role"]
    },
    designation: {
        type: String,
        required: [true, "Please define user designation"]
    },
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
        },
    }],
    date: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("newUser", newUserSchema);
