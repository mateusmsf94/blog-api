const { getUserEmailAndEmail } = require('../services/user.service');
const { createToken } = require('../auth/authFuncs');

module.exports = async (req, res) => {
  try {
    console.log('ty');
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const user = await getUserEmailAndEmail(email, password);   
    if (!user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const { _password, ...userWithoutPassword } = user;
    const token = createToken(userWithoutPassword);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
