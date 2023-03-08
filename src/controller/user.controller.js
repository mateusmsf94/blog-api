const {
  emailExists,
  createUser,
  getAllUsers,
  getUserById,
} = require('../services/user.service');
const { createToken } = require('../auth/authFuncs');

const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await emailExists(email);
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
};

const createUserController = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await createUser(displayName, email, password, image);
    const { _password, ...userWithoutPassword } = user;
    const token = createToken(userWithoutPassword);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkUserExists,
  createUserController,
  getAllUsersController,
  getUserByIdController,
};
