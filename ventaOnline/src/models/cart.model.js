'use strict'

const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    products: [
        {
        product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
        quantity: Number
        }
    ],
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Cart', cartSchema);