// controllers/authController.js

const authService = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const { phone, fullName, role, password, nationalId } = req.body;
    if (!['admin','hospital','chv','patient'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const user = await authService.register(phone, fullName, role, password, nationalId);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const data = await authService.login(phone, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };