const express = require("express");
const {authMiddleware} = require("../../middleware/authMiddleware");
const AuthControllers = require('../../controllers/user/AuthControllers')
const routes = express.Router();

routes.put('/email', authMiddleware, AuthControllers.changeEmail);

routes.put('/password', authMiddleware, AuthControllers.changePassword);

module.exports = routes;