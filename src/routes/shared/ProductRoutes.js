const express = require('express');
const ProductControllers = require('../../controllers/shared/ProductControllers')

const route = express.Router();

route.get('/products', ProductControllers.getAllProducts);

route.get('/products/:productId', ProductControllers.getProductDetails);

module.exports = route;