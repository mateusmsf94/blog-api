const expresss = require('express');
const { checkToken } = require('../middleware/checkToken');
const { validatePost } = require('../middleware/validatePost');
const {
  checkPostCategory,
  createPostController,
  getAllPostController,
  getPostByIdController,
} = require('../controller/postController');

const postRoute = expresss.Router();

postRoute.post(
  '/',
  checkToken,
  validatePost,
  checkPostCategory,
  createPostController,
);
postRoute.get('/', checkToken, getAllPostController);
postRoute.get('/:id', checkToken, getPostByIdController);

module.exports = postRoute;
