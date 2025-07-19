const express = require("express");
const router = express.Router();
const userController = require("../../controllers/auth/UserController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/get-user-info", userController.getUserInfo);

module.exports = router;
