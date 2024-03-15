const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Leave'],
        required: true
    },
})


module.exports = mongoose.model("Attendance", userSchema)




