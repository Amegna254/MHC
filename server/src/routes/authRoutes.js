const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

// Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);

// Password
router.put(
  "/change-password",
  authMiddleware,
  authController.changePassword
);

router.post(
  "/forgot-password",
  authController.forgotPassword
);

router.post(
  "/reset-password/:token",
  authController.resetPassword
);

module.exports = router;