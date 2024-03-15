const util = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../config.js');
const ErrorHandler = require('../utils/errorHanlder');
const catchAsyncError = require('./catchAsyncError');


exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new ErrorHandler("Token is required.", 401));
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
        const { _id } = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById({ _id });

        if (!req.user) {
            return next(new ErrorHandler("Invalid user.", 401));
        }

        console.log("This is user",req.user);
        next();
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Please Login to access this resource.", 401));
    }


})




exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorHandler("User not found.", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} not allowed to access this Resource.`, 403));
        }

        next();
    };
};