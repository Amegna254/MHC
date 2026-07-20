const {
  User,
  Media,
  Like,
  View,
} = require("../models");
const Listing = require("../models/Listing");
const getImageUrl = (filePath, req) => {
  if (!filePath) return null;

  const normalized = filePath
    .replace(/^src[\\/]/, "")
    .replace(/\\/g, "/");

  const baseUrl =
    process.env.SERVER_URL || `${req.protocol}://${req.get("host")}`;

  return `${baseUrl}/${normalized}`;
};

exports.getCreatorProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // Find creator
    const creator = await User.findOne({
      where: { username },
      attributes: [
        "id",
        "fullName",
        "username",
        "email",
        "profileImage",
        "bio",
      ],
    });

    if (!creator) {
      return res.status(404).json({
        message: "Creator not found",
      });
    }

    // Get uploads
    const uploads = await Media.findAll({
    where: {
    uploadedBy: creator.id,
    visibility: "public",
    status: "published",
    },
    include: [
    {
      model: Listing,
      as: "listing",
    },
    ],
    order: [["createdAt", "DESC"]],
    });

    let totalLikes = 0;
    let totalViews = 0;

   const mappedUploads = await Promise.all(
  uploads.map(async (media) => {
    const listingId = media.listing?.id;

    let likes = 0;
    let views = 0;

    if (listingId) {
      likes = await Like.count({
        where: {
          listingId,
        },
      });

      views = await View.count({
        where: {
          listingId,
        },
      });
    }

    totalLikes += likes;
    totalViews += views;

    return {
      id: listingId,
      mediaId: media.id,
      title: media.title,
      description: media.description,
      fileType: media.fileType,
      mimeType: media.mimeType,
      category: media.category,
      image: getImageUrl(media.filePath, req),
      likes,
      views,
      createdAt: media.createdAt,
    };
  })
);

    res.json({
      creator: {
        id: creator.id,
        fullName: creator.fullName,
        username: creator.username,
        profileImage: creator.profileImage
          ? getImageUrl(creator.profileImage, req)
          : null,
        bio: creator.bio,
      },

      stats: {
        uploads: uploads.length,
        likes: totalLikes,
        views: totalViews,
      },

      uploads: mappedUploads,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load creator profile",
    });
  }
};