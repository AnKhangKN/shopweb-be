const ProductControllers = require('../../controllers/admin/ProductControllers');
const express = require('express');
const uploadImgProducts = require('../../middleware/uploadImagesProduct');
const route = express.Router();

route.post("/products",uploadImgProducts,  ProductControllers.createProduct);

route.get("/products" , ProductControllers.getAllProduct)

module.exports = route;
