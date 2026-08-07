const express = require("express");
const router = express.Router();

const mediaController = require("../controllers/mediaController");

router.get("/:id", mediaController.getListingById);

module.exports = router;