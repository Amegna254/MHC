const express = require("express");
const router = express.Router();

const {
  getCreatorProfile,
} = require("../controllers/creatorController");

// Public creator profile
router.get("/:username", getCreatorProfile);

module.exports = router;