const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0
    },
    publish_date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;