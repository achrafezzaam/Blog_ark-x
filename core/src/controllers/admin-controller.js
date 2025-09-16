const userModel = require('../models/user-model');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.findAll();
        // Remove passwords from all users
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        res.status(200).json({ 
            data: usersWithoutPasswords, 
            error: null 
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }

        const { password, ...userWithoutPassword } = user;
        res.status(200).json({ 
            data: userWithoutPassword, 
            error: null 
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        // Prevent admin from deleting themselves
        if (req.params.id === req.user.id) {
            const error = new Error('You cannot delete your own account');
            error.statusCode = 400;
            return next(error);
        }

        const success = await userModel.remove(req.params.id);
        if (!success) {
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        
        if (!role || !['user', 'admin'].includes(role)) {
            const error = new Error('Invalid role. Must be "user" or "admin"');
            error.statusCode = 400;
            return next(error);
        }

        // Prevent admin from changing their own role
        if (req.params.id === req.user.id) {
            const error = new Error('You cannot change your own role');
            error.statusCode = 400;
            return next(error);
        }

        const updatedUser = await userModel.update(req.params.id, { role });
        if (!updatedUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ 
            data: updatedUser, 
            error: null 
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserRole
};