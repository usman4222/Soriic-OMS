const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Assuming Jwt was a typo and should be jwt
const crypto = require('crypto');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config.js');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    // tokens: [
    //     {
    //         token: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ]
})

// userSchema.methods.getJWTToken = function () {

//     return jwt.sign({ id: this._id }, JWT_SECRET, {
//         expiresIn: JWT_EXPIRES_IN
//     })

// }

// userSchema.methods.generateAuthToken = async function () {
//     try {
//         let token = jwt.sign({ _id: this._id }, JWT_SECRET);
//         this.tokens = this.tokens.concat({ token: token });
//         await this.save();
//         return token;
//     } catch (error) {
//         console.log(error);
//     }
// }
userSchema.methods.getJWTToken = function () {

    return jwt.sign({ _id: this._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}



module.exports = mongoose.model("User", userSchema)




