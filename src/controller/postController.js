const { getAllCategories } = require('../services/category.service');
const {
  create,
  getAllPosts,
  getPostById,
} = require('../services/post.service');

const checkPostCategory = async (req, res, next) => {
  const { categoriesIds } = req.body;
  if (!categoriesIds) {
    return res
      .status(400)
      .json({ message: 'one or more "categoryIds" not found' });
  }

  const categoriesArr = await getAllCategories(categoriesIds);
  if (categoriesArr.length !== categoriesIds.length) {
    return res
      .status(400)
      .json({ message: 'one or more "categoryIds" not found' });
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

const getPostByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkPostCategory,
  createPostController,
  getAllPostController,
  getPostByIdController,
};
