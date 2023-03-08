const express = require('express');
const { createCategoryController } = require('../controller/category.controller');
const { checkToken } = require('../middleware/checkToken');
const { checkCategoryName } = require('../middleware/validateCategoryName');

const categoryRoute = express.Router();

categoryRoute.post('/', checkToken, checkCategoryName, createCategoryController);

module.exports = categoryRoute;