const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
* @route GET api/product
* @desc  Get all the products
*/
router.get('/', productController.getAll);

/**
* @route GET api/product/:productId
* @desc  Get one product by Id
*/
router.get('/:pId', productController.getOne);

/**
* @route POST api/product/addProduct
* @desc  Add a new product
*/
router.post('/addProduct', productController.addProduct);

module.exports = router;