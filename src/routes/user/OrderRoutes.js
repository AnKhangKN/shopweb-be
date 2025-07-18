const express = require('express');
const routes = express.Router();
const OrderControllers = require("../../controllers/user/OrderControllers")

routes.post("/orders/:userId", OrderControllers.createOrder);

module.exports = routes;