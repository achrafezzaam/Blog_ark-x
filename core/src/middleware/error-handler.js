const errorHandler = (err, req, res, next) => {
    // Avoid sending response headers twice
    if (res.headersSent) {
        return next(err);
    }
    
    console.error(`[ERROR] ${err.stack}`);
    
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'An internal server error occurred';
    
    res.status(statusCode).json({
        data: null,
        error: {
            message: errorMessage,
            ...(err.details && { details: err.details })
        }
    });
};

module.exports = errorHandler;
