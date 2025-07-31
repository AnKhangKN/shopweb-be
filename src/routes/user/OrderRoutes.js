const express = require('express');
const routes = express.Router();
const OrderControllers = require("../../controllers/user/OrderControllers")
const {authMiddleware} = require("../../middleware/authMiddleware");

routes.post("/orders", authMiddleware, OrderControllers.createOrder);

routes.get("/shippingAddress", authMiddleware, OrderControllers.getShippingAddress);

routes.post("/shippingAddress", authMiddleware, OrderControllers.addShippingAddress);

routes.delete("/shippingAddress", authMiddleware, OrderControllers.deleteShippingAddress);

routes.patch("/orders/status", authMiddleware, OrderControllers.updateOrderStatus);

module.exports = routes;