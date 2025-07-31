const express = require("express");
const routes = express.Router();
const OrderControllers = require("../../controllers/admin/OrderControllers")

routes.get("/orders", OrderControllers.getOrders);
routes.patch("/order/:id", OrderControllers.updateStatusOrder);

module.exports = routes; 