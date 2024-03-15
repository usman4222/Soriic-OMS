const catchAsyncError = require("../middleware/catchAsyncError");
const newUser = require("../models/newUserModel");
const ErrorHandler = require("../utils/errorHanlder");
const ApiFeatures = require("../utils/search");



//Add New Employee
exports.addNewEmployee = catchAsyncError(async (req, res, next) => {
    try {
        const { name, fatherName, phone, address, role, designation } = req.body;

        const user = new newUser({
            name,
            fatherName,
            phone,
            address,
            role,
            designation
        });

        await user.save();

        res.status(201).json({ success: true, data: user, message: "New User Created Successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message, });
    }
})


//Get All Employee


// exports.getAllEmployees = catchAsyncError(async (req, res, next) => {
//     try {
//         const users = await newUser.find();

//         if (users.length === 0) {
//             return next(new ErrorHandler("No Users Found", 404));
//         }

//         res.status(200).json({
//             success: true,
//             users,
//         });
//         return next();
//     } catch (error) {
//         console.error('Error getting users:', error);
//         return next(new ErrorHandler("Error getting users", 500));
//     }
// });
// const users = await newUser.find()


exports.getAllEmployees = catchAsyncError(async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const apiFeature = new ApiFeatures(newUser.find(), { keyword });
        const users = await apiFeature.search();

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Error getting users", 500));
    }
});



//delete employee
exports.deleteEmployee = catchAsyncError(async (req, res, next) => {
    const user = await newUser.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`No User exists with this ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        message: "User Deleted successfully"
    });
});


//edit employee
exports.updateEmployee = catchAsyncError(async (req, res, next) => {

    let user = newUser.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler("User Not found", 404));
    }

    user = await newUser.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})


//get one employee Details
exports.getOneEmployeeDetails = catchAsyncError(async (req, res, next) => {

    const user = await newUser.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler("User Not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    })
})