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

router.get(
  "/user",
  authMiddleware,
  mediaController.getUserMedia
);

router.get(
  "/",
  mediaController.getAllMedia
);

router.get(
  "/:id",
  mediaController.getMediaById
);

router.post(
  "/:id/like",
  authMiddleware,
  mediaController.incrementLike
);

router.post(
  "/:id/view",
  mediaController.incrementView
);

router.post(
  "/:id/comment",
  authMiddleware,
  mediaController.addComment
);

router.put(
  "/:id",
  authMiddleware,
  mediaController.updateMedia
);

router.delete(
  "/:id",
  authMiddleware,
  mediaController.deleteMedia
);

module.exports = router;