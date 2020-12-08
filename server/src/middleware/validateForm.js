const {check , validationResult} = require('express-validator');

exports.validationResult = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = result.array()[0].msg;
        return res.status(422).json({success: false, error: error})
    }
    next();
}

exports.validator = [
    check('title').trim().not().isEmpty().withMessage('Title is required')
    .isLength({min: 3, max:30}).withMessage('Must have at least 3 characters'),
    check('price').trim().not().isEmpty().withMessage('Price is required!')
    .isNumeric().withMessage('Must be a numeric value'),
    check('stock').trim().not().isEmpty().withMessage('Stock field is required!')
    .isNumeric().withMessage('Must be a numeric value'),
    check('publish_date').isISO8601().toDate().withMessage('Must be a valid date')
]