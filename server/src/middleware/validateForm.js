const { check, validationResult } = require('express-validator');
const Joi = require('@hapi/joi');

exports.validationResult = (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		const error = result.array()[0].msg;
		return res.status(422).json({ success: false, error: error });
	}
	next();
};

exports.validator = [
	check('title')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Title is required')
		.isLength({ min: 3, max: 30 })
		.withMessage('Must have at least 3 characters'),
	check('price')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Price is required!')
		.isNumeric()
		.withMessage('Must be a numeric value'),
	check('stock')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Stock field is required!')
		.isNumeric()
		.withMessage('Must be a numeric value'),
	check('publish_date').isISO8601().toDate().withMessage('Must be a valid date'),
];

exports.validateRegister = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(4).required(),
		surname: Joi.string().min(4).required(),
		email: Joi.string().required().email(),
		password: Joi.string().min(8).required(),
		username: Joi.string().min(5).required(),
	});

	return schema.validate(data);
};

exports.validateLogin = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(4).required(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};
