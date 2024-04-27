// IMPORTS
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Controllers
const { login, register, me } = require('./../controllers/auth');

// Request Methods
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);

// Exports
module.exports = router;