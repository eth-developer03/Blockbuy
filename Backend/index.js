const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/models');
const verify = require('./middleware/verify');

const app = express();
require('dotenv').config();
// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const JWT_SECRET = process.env.SECRET;

const setCookie = (res, token) => {
  try {
    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
      path: '/',
      sameSite: 'None',
    });

    console.log('Cookie set:', res.getHeader('Set-Cookie'));
  } catch (e) {
    console.log('error while setting the cookies', e);
  }
};

app.post('/api/register', async (req, res) => {
  const { name, email, password, gender, age, phoneNumber } = req.body;
  console.log(req.body);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User already exists. Please sign in.' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      gender,
      age,
      phoneNumber,
    });
    console.log('the new user is ', newUser);

    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    newUser.jwt = token;
    await newUser.save();

    // Set cookie
    setCookie(res, token);

    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
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
// app.use((req, res, next) => {
//   const token = req.cookies.token;

//   if (token) {
//     jwt.verify(token, JWT_SECRET, (err, authData) => {
//       if (err) {
//         res.sendStatus(403); // Forbidden
//       } else {
//         req.authData = authData;
//         next();
//       }
//     });
//   } else {
//     res.sendStatus(403); // Forbidden
//   }
// });

app.use(verify);
// Logout Route
app.get('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/',
  });
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
