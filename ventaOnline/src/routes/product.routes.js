'use strict'

const productController = require('../controllers/product.controller');
const express = require('express');
const mdAuth = require('../services/authenticated');
const api = express.Router();


api.post('/saveProduct', [mdAuth.ensureAuth, mdAuth.isAdmin], productController.saveProduct);
api.get('/getProducts', mdAuth.ensureAuth, productController.getProducts);
api.get('/getProduct/:id', mdAuth.ensureAuth, productController.getProduct);
api.post('/searchProduct', mdAuth.ensureAuth, productController.searchProduct);
api.put('/updateProduct/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], productController.updateProduct);
api.delete('/deleteProduct/:id',[mdAuth.ensureAuth, mdAuth.isAdmin], productController.deleteProduct);

module.exports = api;