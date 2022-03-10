'use strict'

const cartController = require('../controllers/cart.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');


api.post('/saveCart', mdAuth.ensureAuth, cartController.saveCart);

module.exports = api;