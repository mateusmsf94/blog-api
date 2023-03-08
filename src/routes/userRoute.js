const express = require('express');
const { validateDisplayName } = require('../middleware/validateDisplayName');
const { validateEmail } = require('../middleware/validateEmail');
const { validatePassword } = require('../middleware/validatePassword');
const { checkToken } = require('../middleware/checkToken');
const {
  checkUserExists,
  createUserController,
  getAllUsersController,
  getUserByIdController,
} = require('../controller/user.controller');

const userRoute = express.Router();

userRoute.post(
  '/',
  validateDisplayName,
  validateEmail,
  checkUserExists,
  validatePassword,
  createUserController,
);

userRoute.get('/', checkToken, getAllUsersController);
userRoute.get('/:id', checkToken, getUserByIdController);

module.exports = userRoute;
