const express = require("express");
const {authMiddleware} = require("../../middleware/authMiddleware");
const UserControllers = require("../../controllers/user/UserControllers");
const uploadAvatar = require("../../middleware/uploadImageAvatarUser");

const routes = express.Router();

routes.get("/orders/histories", authMiddleware, UserControllers.getAllOrderHistory);

routes.put("/updateUserName", authMiddleware, UserControllers.updateUserName);

routes.post("/uploadAvatar", authMiddleware, uploadAvatar, UserControllers.uploadAvatar);

module.exports = routes;