const jwt = require('jsonwebtoken');
const User = require('./users.model');

const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

const register = async (req, res) => {
    try {

        const { email, password, role } = req.body;
  
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }
    
        const user = await User.create({ email, password, role });
    
        const token = signToken(user);
        res.status(201).json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const login = async (req, res) => {
const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePassword = async (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });
  
      user.password = newPassword;
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports = { register, login, updatePassword};
