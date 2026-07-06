const Media = require("../models/Media");
const User = require("../models/User");

exports.uploadMedia = async (req, res) => {
  try {
    const media = await Media.create({
  title: req.body.title,
  description: req.body.description,
  fileName: req.file.filename,
  fileType: req.file.mimetype,
  filePath: req.file.path,
  uploadedBy: req.user.id,
});

    res.status(201).json({
      message: "Upload successful",
      media,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};
exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(media);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch media",
    });
  }
};