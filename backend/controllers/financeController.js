const catchAsyncError = require("../middleware/catchAsyncError");
const spend = require("../models/financeModel");
const ErrorHandler = require("../utils/errorHanlder");
const ApiFeatures = require("../utils/search");


exports.financeController = catchAsyncError(async (req, res, next) => {
    try {
        const { title, ref, amount, description, date } = req.body;

        const expense = new spend({ title, ref, amount, description, date });

        const savedExpense = await expense.save();

        res.status(201).json({ success: true, data: savedExpense, message: "New Expense Saved Successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});


exports.getAllExpenses = catchAsyncError(async (req, res, next) => {
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
                    expenses: { $push: '$$ROOT' },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalAmount: 1,
                    expenses: 1,
                },
            },
        ];

        const result = await spend.aggregate(aggregationPipeline);

        res.status(200).json({
            success: true,
            totalAmount: result.length > 0 ? result[0].totalAmount : 0,
            expenses: result.length > 0 ? result[0].expenses : [],
        });
    } catch (error) {
        return next(new ErrorHandler("Error getting expenses", 500));
    }
});


exports.expenseList = catchAsyncError(async (req, res, next) => {
    try {
        const expenseList = await spend.find()

        return res.status(200).json({
            success: true,
            expenseList
        });
    } catch (error) {
        return next(new ErrorHandler("Error while getting expense List"));
    }
});

exports.getCurrentMonthExpenses = catchAsyncError(async (req, res, next) => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const totalMonthlyExpenses = await spend.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, currentMonth] },
                    { $eq: [{ $year: "$date" }, currentYear] },
                ],
            },
        });

        if (totalMonthlyExpenses.length === 0) {
            return next(new ErrorHandler("No Expenses Found for this month", 404));
        }

        const totalCurrentMonthExpenses = totalMonthlyExpenses.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0
        );

        res.status(200).json({
            success: true,
            totalCurrentMonthExpenses,
        });
    } catch (error) {
        return next(new ErrorHandler("Error getting current month expenses", 500));
    }
});
