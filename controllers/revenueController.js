const catchAsyncError = require("../middleware/catchAsyncError");
const revenue = require("../models/revenueModel");
const ErrorHandler = require("../utils/errorHanlder");
const ApiFeatures = require("../utils/search");


exports.createRevenue = catchAsyncError(async (req, res, next) => {
    try {
        const { ref, amount, date, description, month } = req.body

        const Revenue = new revenue({ ref, amount, date, description, month })

        const revenueSalary = await Revenue.save()

        res.status(200).json({
            success: true,
            data: revenueSalary,
            message: "Revenue Created Successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
})

exports.revenueList = catchAsyncError(async (req, res, next) => {
    try {
        const revenueList = await revenue.find()

        return res.status(200).json({
            success: true,
            revenueList
        });
    } catch (error) {
        return next(new ErrorHandler("Error while getting revenue list"));
    }
});





exports.getAllRevenue = catchAsyncError(async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Both start date and end date are required.',
            });
        }

        const dateFilter = {
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        };

        const aggregationPipeline = [
            { $match: dateFilter },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' },
                    revenues: { $push: '$$ROOT' },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalAmount: 1,
                    revenues: 1,
                },
            },
        ];

        const result = await revenue.aggregate(aggregationPipeline);

        res.status(200).json({
            success: true,
            totalAmount: result.length > 0 ? result[0].totalAmount : 0,
            revenues: result.length > 0 ? result[0].revenues : [],
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Error getting revenues', 500));
    }
});



exports.getCurrentMonthRevenue = catchAsyncError(async (req, res, next) => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const totalMonthlyRevenue = await revenue.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, currentMonth] },
                    { $eq: [{ $year: "$date" }, currentYear] },
                ],
            },
        });

        if (totalMonthlyRevenue.length === 0) {
            return next(new ErrorHandler("No Revenues Found for this month", 404));
        }

        const totalCurrentMonthRevenue = totalMonthlyRevenue.reduce(
            (total, revenue) => total + parseFloat(revenue.amount),
            0
        );

        res.status(200).json({
            success: true,
            totalCurrentMonthRevenue,
        });
    } catch (error) {
        return next(new ErrorHandler("Error getting current month revenue", 500));
    }
});
