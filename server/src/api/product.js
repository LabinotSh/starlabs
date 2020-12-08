const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//Middleware validation methods for the form
const {validationResult, validator} = require('../middleware/validateForm');

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
* @route POST api/product/add
* @desc  Add a new product
*/
router.post('/add', validator, validationResult, productController.addProduct);

/**
* @route DELETE api/product/remove/:pId
* @desc  Delete a product by id
*/
router.delete('/remove/:pId', productController.deleteOne);

module.exports = router;