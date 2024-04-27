// IMPORTS
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');



// Controllers
const { createSale,  getSale } = require('./../controllers/posts');




router.get('/:id', getSale);
router.post('/create', authMiddleware, createSale);




module.exports = router;