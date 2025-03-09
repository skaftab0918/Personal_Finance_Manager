const express = require('express');
const { register, login, getUser, updateProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get user details
router.get('/user', authMiddleware, getUser);

// Update user profile
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;