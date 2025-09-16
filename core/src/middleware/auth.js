const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error('Access token required');
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const authError = new Error('Token expired');
            authError.statusCode = 401;
            return next(authError);
        } else if (error.name === 'JsonWebTokenError') {
            const authError = new Error('Invalid token');
            authError.statusCode = 401;
            return next(authError);
        }
        next(error);
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            const error = new Error('Authentication required');
            error.statusCode = 401;
            return next(error);
        }

        if (!roles.includes(req.user.role)) {
            const error = new Error('Insufficient permissions');
            error.statusCode = 403;
            return next(error);
        }

        next();
    };
};

const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
    }

    const token = authHeader.substring(7);

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
    } catch (error) {
        // Ignore token errors for optional auth
    }
    
    next();
};

module.exports = {
    authenticate,
    authorize,
    optionalAuth
};