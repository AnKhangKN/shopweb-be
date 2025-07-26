const express = require("express");
const {authMiddleware} = require("../../middleware/authMiddleware");
const WishControllers = require("../../controllers/user/WishControllers");
const routes = express.Router();

routes.post("/wishes", authMiddleware, WishControllers.addWishList);

routes.delete("/wishes", authMiddleware, WishControllers.deleteWishItem);

module.exports = routes;