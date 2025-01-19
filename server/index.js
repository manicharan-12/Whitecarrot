require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const {connectDB}=require('./config/config')
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

connectDB()

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});