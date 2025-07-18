const express = require("express");
const routes = express.Router();
const CartControllers = require("../../controllers/user/CartControllers")

routes.post("/carts", CartControllers.createCart);

routes.get("/carts/:user_id", CartControllers.getCarts);

module.exports = routes;