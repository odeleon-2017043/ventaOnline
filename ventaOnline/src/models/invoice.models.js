'use strict'

const mongoose = require('mongoose');

const InvoiceSchema = mongoose.Schema({
    quantity: Number,
    product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Invoice', InvoiceSchema);



