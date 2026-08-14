const express = require("express");
const router = express.Router();
const upload = require("../middleware/avatarUpload");
const auth = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  uploadAvatar,
  changePassword,
} = require("../controllers/userController");
router.get("/me", auth, getProfile);

router.put("/me", auth, updateProfile);

router.put("/avatar", auth, upload.single("avatar"), uploadAvatar);

router.put("/password", auth, changePassword);

module.exports = router;