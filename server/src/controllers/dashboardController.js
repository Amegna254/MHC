const Media = require("../models/Media");

exports.getDashboard = async (req, res) => {
  try {
    const uploads = await Media.findAll({
      where: {
        uploadedBy: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    const stats = {
      totalUploads: uploads.length,
      images: uploads.filter((m) => m.fileType.startsWith("image")).length,
      videos: uploads.filter((m) => m.fileType.startsWith("video")).length,
      audio: uploads.filter((m) => m.fileType.startsWith("audio")).length,
      documents: uploads.filter(
        (m) =>
          !m.fileType.startsWith("image") &&
          !m.fileType.startsWith("video") &&
          !m.fileType.startsWith("audio")
      ).length,
    };

    // aggregate engagement metrics for performance overview
    const totalViews = uploads.reduce((acc, m) => acc + (m.views || 0), 0);
    const totalLikes = uploads.reduce((acc, m) => acc + (m.likes || 0), 0);

    res.json({
      success: true,
      user: req.user,
      stats,
      recentUploads: uploads.slice(0, 5),
      performance: {
        totalViews,
        totalLikes,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};