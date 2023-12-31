const { createCategory, getAllCategories } = require('../services/category.service');

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await createCategory(name);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createCategoryController, getAllCategoriesController };