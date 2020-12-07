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
    //There is no need to add a certain field for publish date since mongoose adds it by itself
    //By adding timestamps as true
    // publish_Date: {
    //     type: Date,
    //     required: true
    // }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;