const { getAllCategories } = require('../services/category.service');
const { create, getAllPosts } = require('../services/post.service');

const checkPostCategory = async (req, res, next) => {
  const { categoriesIds } = req.body;
  if (!categoriesIds) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const categoriesArr = await getAllCategories(categoriesIds);
  if (categoriesArr.length !== categoriesIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

const createPostController = async (req, res) => {
  const post = req.body;
  const { id: userId } = req.data;
  const { type, message } = await create(post, userId);
  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(201).json(message);
}; 

const getAllPostController = async (req, res) => {
  try {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { checkPostCategory, createPostController, getAllPostController };