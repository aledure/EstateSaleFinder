// IMPORTS
const express = require('express');
const router = express.Router();



// Controllers
const { getSale, getSales } = require('./../controllers/sales');


router.get('/', getSales);
router.get('/:id', getSale);



module.exports = router;