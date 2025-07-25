const express = require("express");
const routes = express.Router();
const CartControllers = require("../../controllers/user/CartControllers")
const {authMiddleware} = require("../../middleware/authMiddleware");

routes.post("/carts", authMiddleware, CartControllers.createCart);

routes.get("/carts",authMiddleware,  CartControllers.getCarts);

routes.put("/carts/updateQuantity", authMiddleware, CartControllers.updateQuantity);

routes.delete("/carts", authMiddleware, CartControllers.deleteCartItem);

module.exports = routes;