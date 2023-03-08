const express = require('express');
const {
  createCategoryController,
  getAllCategoriesController,
} = require('../controller/category.controller');
const { checkToken } = require('../middleware/checkToken');
const { checkCategoryName } = require('../middleware/validateCategoryName');

const categoryRoute = express.Router();

categoryRoute.post(
  '/',
  checkToken,
  checkCategoryName,
  createCategoryController,
);
categoryRoute.get('/', checkToken, getAllCategoriesController);

module.exports = categoryRoute;
