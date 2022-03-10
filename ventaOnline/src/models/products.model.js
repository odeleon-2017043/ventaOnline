'use strict'

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    nameProduct: String,
    price: String,
    stock: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    category: {type: mongoose.Schema.ObjectId, ref: 'Category'} 
});

module.exports = mongoose.model('Product', productSchema);