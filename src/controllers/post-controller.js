const postModel = require('../models/post-model');
const { validatePostCreate, validatePostUpdate } = require('../utils/validate');

const getAllPosts = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            sort = 'createdAt',
            order = 'desc',
            q = ''
        } = req.query;

        // Basic validation for query params
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const validSorts = ['createdAt', 'title'];
        const validOrders = ['asc', 'desc'];

        const queryOptions = {
            page: pageNum > 0 ? pageNum : 1,
            limit: limitNum > 0 ? limitNum : 10,
            sort: validSorts.includes(sort) ? sort : 'createdAt',
            order: validOrders.includes(order) ? order : 'desc',
            q
        };

        const result = await postModel.findAll(queryOptions);
        res.status(200).json({ data: result, error: null });
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (!post) {
            const error = new Error('Post not found');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ data: post, error: null });
    } catch (error) {
        next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        const { value, error } = validatePostCreate(req.body);
        if (error) {
            return next(error);
        }
        
        const newPost = await postModel.create(value);
        res.status(201).json({ data: newPost, error: null });
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const { value, error } = validatePostUpdate(req.body);
        if (error) {
            return next(error);
        }

        const updatedPost = await postModel.update(req.params.id, value);
        if (!updatedPost) {
            const error = new Error('Post not found');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ data: updatedPost, error: null });
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const success = await postModel.remove(req.params.id);
        if (!success) {
            const error = new Error('Post not found');
            error.statusCode = 404;
            return next(error);
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
