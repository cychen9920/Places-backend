const express = require('express');
const bcrypt = require('bcrypt'); //password hashing
const jwt = require('jsonwebtoken'); //JWT tokens
const User = require('./models/User'); //Mongoose user model

const router = express.Router();
//TODO: set JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    //user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    //create user in MongoDB w/ email, hashed password
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    //create JWT token, embe _id as userId
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    //send token back as JSON
    res.json({ token });
  }
  catch (err) {
    console.error('Registration failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

//Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    //if user email not found
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    //if user password does not match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    //username and password are valid: create/send JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
    }
    catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ error: 'Server error' });
    }
});

//export router for server.js
module.exports = router;
