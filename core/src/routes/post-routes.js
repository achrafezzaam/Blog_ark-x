const express = require('express');
const router = express.Router();
const postController = require('../controllers/post-controller');
const { authenticate, authorize, optionalAuth } = require('../middleware/auth');

router.route('/')
    .get(optionalAuth, postController.getAllPosts)
    .post(authenticate, authorize('admin', 'user'), postController.createPost);

router.route('/:id')
    .get(optionalAuth, postController.getPostById)
    .put(authenticate, authorize('admin', 'user'), postController.updatePost)
    .delete(authenticate, authorize('admin'), postController.deletePost);

module.exports = router;
