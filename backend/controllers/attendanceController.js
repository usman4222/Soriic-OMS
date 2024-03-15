const { default: mongoose } = require('mongoose');
const catchAsyncError = require('../middleware/catchAsyncError');
const newUser = require('../models/newUserModel');
const userModel = require('../models/userModel');
const ErrorHandler = require('../utils/errorHanlder');

exports.markAttendance = catchAsyncError(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { attendance } = req.body;

        if (!Array.isArray(attendance) || attendance.length === 0) {
            return next(new ErrorHandler("Attendance status is missing or empty", 400));
        }

        const user = await newUser.findById(id);

        if (!user) {
            return next(new ErrorHandler('User Not found', 404));
        }

        const updatedAttendance = [];

        for (const entry of attendance) {
            const { status, date } = entry;

            const existingAttendanceIndex = user.attendance.findIndex(
                (a) => a.date.toDateString() === new Date(date).toDateString()
            );

            if (existingAttendanceIndex !== -1) {
                user.attendance[existingAttendanceIndex].status = status;
                updatedAttendance.push(user.attendance[existingAttendanceIndex]);
            } else {
                user.attendance.push({ date, status });
                updatedAttendance.push({ date, status });
            }
        }

        const result = await user.save();
        return res.status(200).json({ success: true, message: 'Attendance status updated successfully', updatedAttendance });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});



exports.searchUserAttendance = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        const user = await newUser.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        let filteredAttendance;

        if (startDate && endDate) {
            filteredAttendance = user.attendance.filter((entry) => {
                const entryDate = new Date(entry.date);
                return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
            });
        } else {
            filteredAttendance = user.attendance;
        }

        let presentCount = 0;
        let absentCount = 0;
        let leaveCount = 0;

        filteredAttendance.forEach((entry) => {
            switch (entry.status) {
                case 'Present':
                    presentCount++;
                    break;
                case 'Absent':
                    absentCount++;
                    break;
                case 'Leave':
                    leaveCount++;
                    break;
                default:
                    break;
            }
        });

        const totalEntries = filteredAttendance.length;

        const presentPercentage = (presentCount / totalEntries) * 100;

        res.status(200).json({
            success: true,
            userAttendance: filteredAttendance,
            presentCount,
            absentCount,
            leaveCount,
            totalEntries,
            presentPercentage,
        });
    } catch (error) {
        console.error(`Error getting user attendance: ${error.message}`);
        next(error);
    }
});


exports.getSpecificUserAttendance = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await newUser.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const userAttendance = user.attendance.filter((entry) => {
            const entryDate = new Date(entry.date);
            return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
        });

        let presentCount = 0;
        let absentCount = 0;
        let leaveCount = 0;

        userAttendance.forEach((entry) => {
            switch (entry.status) {
                case 'Present':
                    presentCount++;
                    break;
                case 'Absent':
                    absentCount++;
                    break;
                case 'Leave':
                    leaveCount++;
                    break;
                default:
                    break;
            }
        });

        const totalEntries = userAttendance.length;

        const presentPercentage = (presentCount / totalEntries) * 100;

        res.status(200).json({
            success: true,
            userAttendance,
            presentCount,
            absentCount,
            leaveCount,
            totalEntries,
            presentPercentage,
        });
    } catch (error) {
        console.error(`Error getting user attendance: ${error.message}`);
        next(error);
    }
});



exports.getSingleAttendance = async (req, res, next) => {
    const userId = req.params.id;
    const attendanceId = req.params.attendanceId;

    if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid attendanceId format',
        });
    }

    try {
        const user = await newUser.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        const userAttendance = user.attendance;

        const specificAttendance = userAttendance.find(entry => entry._id.toString() === attendanceId);

        if (!specificAttendance) {
            return res.status(404).json({
                success: false,
                error: 'Attendance entry not found',
            });
        }

        res.status(200).json({
            success: true,
            specificAttendance,
        });
    } catch (error) {
        console.error(`Error getting user attendance: ${error.message}`);
        next(error);
    }
};




exports.editSingleAttendance = async (req, res, next) => {
    const userId = req.params.id;
    const attendanceId = req.params.attendanceId;
    const { date, status } = req.body;

    try {
        const user = await newUser.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        const userAttendance = user.attendance;

        const specificAttendance = userAttendance.find(entry => entry._id.toString() === attendanceId);

        if (!specificAttendance) {
            return res.status(404).json({
                success: false,
                error: 'Attendance entry not found',
            });
        }

        if (status !== undefined) {
            specificAttendance.status = status;
        }

        if (date) {
            specificAttendance.date = date;
        }

        await user.save();

        res.status(200).json({
            success: true,
            specificAttendance,
        });
    } catch (error) {
        console.error(`Error editing user attendance: ${error.message}`);
        next(error);
    }
};
