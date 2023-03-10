const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({
    name,
  });
  return category;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const findByIds = async (id) => {
 const categoriesId = Category.findAll({ where: { id } });
 return categoriesId;
};

module.exports = { createCategory, getAllCategories, findByIds };
