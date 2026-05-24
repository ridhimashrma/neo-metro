const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
  
      console.log("REQ BODY:", req.body);
  
      const users = await User.find();
      console.log("ALL USERS:", users);
  
      const { name, email, password, phone } = req.body;
  
      const exists = await User.findOne({ email });
  
      console.log("FOUND USER:", exists);
  
      if (exists) {
        return res.status(400).json({
          message: 'User already exists'
        });
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'user',
    });

    const token = jwt.sign(
      { id: user._id },
      'secretkey',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      'secretkey',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/users', async (req, res) => {
    try {
  
      const users = await User.find().select('-password');
  
      res.json(users);
  
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  });

module.exports = router;