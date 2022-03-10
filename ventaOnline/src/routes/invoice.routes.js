'use strict'

const invoiceController = require('../controllers/invoice.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/test', [mdAuth.ensureAuth, mdAuth.isAdmin], invoiceController.prueba);
api.get('/savePurchase', mdAuth.ensureAuth, invoiceController.savePurchase);

module.exports = api;