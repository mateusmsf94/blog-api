const { User } = require('../models');

const getUserEmailAndEmail = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

const emailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (displayName, email, password, image) => {
  const user = await User.create({
    displayName,
    email,
    password,
    image,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
  return user;
};

module.exports = { getUserEmailAndEmail, emailExists, createUser, getAllUsers, getUserById };