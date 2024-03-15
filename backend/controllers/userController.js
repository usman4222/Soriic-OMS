const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHanlder');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');

exports.registerUser = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const newUser = await User.create({ email, password });

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            newUser
        });
    } catch (error) {
        next(error)
        console.error("Registration Error:", error);
    }
})


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter Email and Password", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    const storedPassword = user.password;

    if (!storedPassword) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    if (password === storedPassword) {
        sendToken(user, 200, res);
    } else {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }
});



exports.logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
})
