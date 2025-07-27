const express = require("express");
const ImageControllers = require("../../controllers/shared/ImageControllers");

const route = express.Router();

route.get('/product/:filename', ImageControllers.getAllImageProducts);

route.get('/avatar/:filename', ImageControllers.getAllImageAvatar);

module.exports = route;
