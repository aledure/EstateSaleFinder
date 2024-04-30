// IMPORTS
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');




// Controllers
const { getSaleById, getAllSales, createSale, updateSale, deleteSale, searchSaleByTitle } = require('./../controllers/saleController');


router.get('/', getAllSales);
router.get('/:id', getSaleById);
router.post('/', authMiddleware, createSale);
router.put('/:id', authMiddleware, updateSale);
router.delete('/:id', authMiddleware, deleteSale);
router.get('/search/:title', searchSaleByTitle);




module.exports = router;