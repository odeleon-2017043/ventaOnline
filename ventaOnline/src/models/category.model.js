'use strict'

const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    nameCategory: String,
    description: String,
    product: {type: mongoose.Schema.ObjectId, ref: 'Product'}
});

module.exports = mongoose.model('Category', categorySchema);