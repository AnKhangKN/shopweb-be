const ProductControllers = require('../../controllers/admin/ProductControllers');
const express = require('express');
const uploadImgProducts = require('../../middleware/uploadImagesProduct');
const route = express.Router();

route.post("/products", uploadImgProducts,  ProductControllers.createProduct);

route.get("/products" , ProductControllers.getAllProduct);

route.patch("/products/:id/details", uploadImgProducts, ProductControllers.addProductDetail);

route.put("/products/:id", uploadImgProducts, ProductControllers.updateProduct);

route.delete("/products/:id/details/:detailId", ProductControllers.deleteProductDetail);

module.exports = route;
