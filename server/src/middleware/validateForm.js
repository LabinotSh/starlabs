const {check ,validationResult} = require('express-validator');

exports.validationResult = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = result.array()[0].msg;
        return res.status(422).json({success: false, error: error})
    }
    next();
}

function isValidDate(value) {
    if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
  
    const date = new Date(value);
    if (!date.getTime()) return false;
    return date.toISOString().slice(0, 10) === value;
}

exports.validator = [
    check('title').trim().not().isEmpty().withMessage('Title is required')
    .isLength({min: 3, max:30}).withMessage('Must have at least 3 characters'),
    check('price').trim().not().isEmpty().withMessage('Price is required!')
    .isNumeric().withMessage('Must be a numeric value'),
    check('stock').trim().not().isEmpty().withMessage('Stock field is required!')
    .isNumeric().withMessage('Must be a numeric value'),
    check('publish_date').not().isEmpty().withMessage('Date is required')
]