const express = require('express');
const router = express.Router();
const postController = require('../controllers/post-controller');

router.route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);

router.route('/:id')
    .get(postController.getPostById)
    .put(postController.updatePost)
    .delete(postController.deletePost);

module.exports = router;
