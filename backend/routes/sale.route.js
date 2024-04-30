// IMPORTS
const express = require('express');
const router = express.Router();

const middleware = require('./../middleware/authentication')



// Controllers
const { getSale, getAllSales, updateSale, deleteSale, createSale } = require('./../controllers/saleController');


router.route('/').get(getAllSales).post(middleware, createSale)
router.route('/:id').get(getSale).patch(updateSale).delete(deleteSale);



module.exports = router;