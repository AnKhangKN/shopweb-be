const express = require("express");
const {authMiddleware} = require("../../middleware/authMiddleware");
const WishControllers = require("../../controllers/user/WishControllers");
const routes = express.Router();

routes.post("/wishes", authMiddleware, WishControllers.addWishList);

routes.delete("/wishes", authMiddleware, WishControllers.deleteWishItem);

routes.get("/wishes", authMiddleware, WishControllers.getAllWishList);

module.exports = routes;