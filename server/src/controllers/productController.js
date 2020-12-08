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
			publish_date: req.body.publish_date
		});
		const savedProduct = await newProduct.save();

		const products = await Product.find();
		res.json(products);
	} catch (error) {
		console.log(error);
	}
};


exports.deleteOne = async (req,res) => {
	const pId = req.params.pId
	try {
		const product = await Product.deleteOne({_id: pId})
		if(product){
			res.json({message:'Product deleted!'})
		}	
	} catch (error) {
		console.log(error)
	}
}

exports.updateOne = async (req,res) => {
	const {pId} = req.params;
	const data = req.body;

	Product.findByIdAndUpdate({_id:pId},data, {new:true}, function (err, doc) {
		if (err) {
			console.log(err);
			return res.send({
				success: false,
				message: 'Error updating product!',
			});
		}
		return res.send({
			success: true,
			newProduct: doc,
			message: 'Product updated!',
		});
	});
}