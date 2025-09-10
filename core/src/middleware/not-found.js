const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        data: null,
        error: {
            message: 'Route not found'
        }
    });
};

module.exports = notFoundHandler;
