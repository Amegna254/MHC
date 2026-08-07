const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const followController = require("../controllers/followController");

router.get(
  "/:creatorId/status",
  authMiddleware,
  followController.getFollowStatus
);

router.post(
  "/:creatorId",
  authMiddleware,
  followController.followCreator
);

router.delete(
  "/:creatorId",
  authMiddleware,
  followController.unfollowCreator
);

module.exports = router;