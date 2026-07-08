const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

// Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);

// Password Management
router.put(
  "/change-password",
  authMiddleware,
  authController.changePassword
);

// Forgot Password
router.post(
  "/forgot-password",
  authController.forgotPassword
);

module.exports = router;