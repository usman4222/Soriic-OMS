const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter Expense Title"]
    },
    ref: {
        type: String,
        required: [true, "Please Enter Ref"]
    },
    amount: {
        type: Number,
        required: [true, "Please Enter amount"]
    },
    description: {
        type: String,
        required: [true, "Please Enter description"]
    },
    date: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('spend', expensesSchema)