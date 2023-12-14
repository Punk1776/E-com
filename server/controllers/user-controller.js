const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async getSingleUser({ user = null, params }, res) {
    try {
      const foundUser = await User.findOne({
        _id: user ? user._id : params.id,
      });

      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(foundUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async createUser({ body }, res) {
    try {
      const { email, username, password } = body; // Extracting email, username, password
      const user = await User.create({ email, username, password });

      if (!user) {
        return res.status(400).json({ message: 'Failed to create user' });
      }

      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async login({ body }, res) {
    try {
      const { email, password } = body; // Extracting email and password
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async saveProductToCart({ user, body }, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedProducts: body } },
        { new: true, runValidators: true }
      );

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async removeProductFromCart({ user, params }, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedProducts: { _id: params.productId } } },
        { new: true }
      );

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
  
  // Add more controller functions as needed
};
