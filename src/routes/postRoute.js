const expresss = require('express');
const { checkToken } = require('../middleware/checkToken');
const { validatePost } = require('../middleware/validatePost');
const {
  checkPostCategory,
  createPostController,
  getAllPostController,
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

module.exports = postRoute;
