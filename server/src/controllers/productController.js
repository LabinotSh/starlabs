const Product = require('../models/Product');

exports.getAll = async (req, res) => {
	const products = Product.find()
		.then((products) => {
			res.json(products);
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getOne = async (req, res) => {
	const pId = req.params.pId;
	const product = Product.findById(pId)
		.then((product) => {
			res.json(product);
		})
		.catch((err) => console.log(err));
};

exports.addProduct = async (req, res, next) => {
	try {
		const newProduct = Product({
			title: req.body.title,
			price: req.body.price,
			stock: req.body.stock,
		});

		const savedProduct = await newProduct.save();
		res.json(savedProduct);
	} catch (error) {
		console.log(error);
	}
};
