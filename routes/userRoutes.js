const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /users
// @desc    Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /users
// @desc    Add a new user
router.post('/', async (req, res) => {
  const { firstName, lastName, phone, email, address } = req.body;

  try {
    const newUser = new User({ firstName, lastName, phone, email, address });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /users/:id
// @desc    Update a user
router.put('/:id', async (req, res) => {
  const { firstName, lastName, phone, email, address } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, phone, email, address },
      { new: true, runValidators: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /users/:id
// @desc    Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
