// errorMiddleware.js

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        err.message = `Resource Not Found, Invalid ${err.path}`;
        err.statusCode = 400;
    }

    if (err.code === 11000) {
        err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err.statusCode = 400;
    }

    if (err.name === "JsonWebTokenError") {
        err.message = `Json Web Token is Invalid, Try again`;
        err.statusCode = 400;
    }

    if (err.name === "TokenExpiredError") {
        err.message = `Json Web Token is Expired, Try again`;
        err.statusCode = 400;
    }

    console.error(err.stack);
    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    });
};
