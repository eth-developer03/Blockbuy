const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const verify = require('./verify');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/blockbuy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Helper function to set a cookie
const setCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
    maxAge: 3600000, // 1 hour
  });
};

// Register Route
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User already exists. Please sign in.' });
    }

    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Set cookie
    setCookie(res, token);

    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User does not exist. Please register.' });
    }

    // Validate password (add actual password validation logic here)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set cookie
    setCookie(res, token);

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware to check authentication
app.use((req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403); // Forbidden
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// Protected Route
app.get('/api/protected', (req, res) => {
  res.json({
    message: 'Protected data',
    authData: req.authData,
  });
});

// Logout Route
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
