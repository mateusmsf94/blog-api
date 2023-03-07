const { emailExists, createUser } = require('../services/user.service');
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

module.exports = { checkUserExists, createUserController };