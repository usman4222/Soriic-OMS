const mongoose = require("mongoose")

const revenueSchema = new mongoose.Schema({
    ref: {
        type: String,
        required: [true, "Please Enter Ref"]
    },
    amount: {
        type: Number,
        required: [true, "Please Enter amount"]
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: [true, "Please Enter description"]
    }
})

module.exports = mongoose.model('revenue', revenueSchema)
