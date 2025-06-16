const express = require("express");
const ImageControllers = require("../../controllers/shared/ImageControllers");

const route = express.Router();

route.get('/:filename', ImageControllers.getAllImageProducts);

module.exports = route;
