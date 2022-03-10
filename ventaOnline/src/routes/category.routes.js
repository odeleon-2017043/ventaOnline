'use strict'

const categoryController = require('../controllers/category.controller');
const express = require('express');
const mdAuth = require('../services/authenticated');
const api = express.Router();


api.post('/saveCategory', [mdAuth.ensureAuth, mdAuth.isAdmin], categoryController.saveCategory);
api.get('/getCategories', mdAuth.ensureAuth, categoryController.getCategories);
api.get('/getCategory/:id', mdAuth.ensureAuth, categoryController.getCategory);
api.post('/searchCategory', mdAuth.ensureAuth, categoryController.searchCategory);
api.put('/updateCategory/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], categoryController.updateCategory);
api.delete('/deleteCategory/:id', mdAuth.ensureAuth, categoryController.deleteCategory);

module.exports = api;