const express = require("express");
const router = express.Router();
const userController = require("../../controllers/auth/UserController");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-otp", userController.verifyOtp);
router.post("/reset-password", userController.resetPassword);
router.get("/get-user-info", authMiddleware, userController.getUserInfo);

module.exports = router;
