const { User } = require('../models');

const getUserEmailAndEmail = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

module.exports = { getUserEmailAndEmail };