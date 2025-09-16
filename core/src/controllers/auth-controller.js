const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const { validateUserRegistration, validateUserLogin } = require('../utils/validate');
const config = require('../config');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
    );
};

const register = async (req, res, next) => {
    try {
        const { value, error } = validateUserRegistration(req.body);
        if (error) {
            return next(error);
        }

        const user = await userModel.create(value);
        const token = generateToken(user);

        res.status(201).json({
            data: {
                user,
                token
            },
            error: null
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { value, error } = validateUserLogin(req.body);
        if (error) {
            return next(error);
        }

        const user = await userModel.validatePassword(value.email, value.password);
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            return next(error);
        }

        const token = generateToken(user);

        res.status(200).json({
            data: {
                user,
                token
            },
            error: null
        });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }

        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(200).json({
            data: userWithoutPassword,
            error: null
        });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }

        const { password, ...userWithoutPassword } = user;
        const token = generateToken(userWithoutPassword);

        res.status(200).json({
            data: {
                user: userWithoutPassword,
                token
            },
            error: null
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getProfile,
    refreshToken
};