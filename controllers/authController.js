const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Utility: send token as HttpOnly cookie
const sendToken = (user, res, statusCode = 200) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists. Please login instead.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    sendToken(user, res, 201);
  } catch (error) {
    console.error('Signup Error:', error.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    sendToken(user, res, 200);
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc    Logout user (optional)
// @route   POST /api/auth/logout
// @access  Public
exports.logout = (req, res) => {
  res.clearCookie('token').json({ success: true, message: 'Logged out successfully' });
};
