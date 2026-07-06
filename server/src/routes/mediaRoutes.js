const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const mediaController = require("../controllers/mediaController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  mediaController.uploadMedia
);

router.get("/", mediaController.getAllMedia);

module.exports = router;