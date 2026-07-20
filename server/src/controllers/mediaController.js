const {
  Media,
  Listing,
  Like,
  Comment,
  View,
  User,
} = require("../models");
const mapCategory = (fileType) => {
  switch (fileType) {
    case "image":
      return { category: "Digital Art", categorySlug: "digital-art" };
    case "audio":
      return { category: "Music & Beats", categorySlug: "music" };
    case "video":
      return { category: "Videos", categorySlug: "videos" };
    case "application":
      return { category: "Notes", categorySlug: "notes" };
    default:
      return { category: "Digital Asset", categorySlug: "digital-art" };
  }
};

const getImageUrl = (filePath, req) => {
  const normalized = filePath.replace(/^src[\\/]/, "");
  const baseUrl = process.env.SERVER_URL || `${req.protocol}://${req.get("host")}`;
  return `${baseUrl}/${normalized}`;
};

exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded.",
      });
    }

    const mime = req.file.mimetype;

let fileType = "other";

if (mime.startsWith("image/")) {
  fileType = "image";
} else if (mime.startsWith("video/")) {
  fileType = "video";
} else if (mime.startsWith("audio/")) {
  fileType = "audio";
} else if (
  mime.includes("pdf") ||
  mime.includes("word") ||
  mime.includes("text") ||
  mime.includes("excel") ||
  mime.includes("sheet") ||
  mime.includes("presentation")
) {
  fileType = "document";
}
    const category = req.body.category || mapCategory(fileType).category;

    const media = await Media.create({
      title: req.body.title,
      description: req.body.description,
      category,
      visibility: req.body.visibility || "public",
      status: req.body.status || "published",
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileType,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path,
      uploadedBy: req.user.id,
    });

    let listing = null;
    if (req.body.createListing !== "false") {
      listing = await Listing.create({
  mediaId: media.id,
  sellerId: req.user.id,
  title: media.title,

  price: req.body.price || Math.max(100, Math.round((req.file.size || 1000) / 1000) * 100),
  currency: req.body.currency || "KES",
  stock: Number(req.body.stock ?? 1),
  licenseType: req.body.licenseType || "standard",
  isForSale: req.body.isForSale !== "false",
  status: req.body.listingStatus || "active",
});
    }

    res.status(201).json({
      message: "Upload successful",
      media,
      listing,
      imageUrl: getImageUrl(media.filePath, req),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};

exports.incrementView = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByPk(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

await View.create({
  listingId: listing.id,
  userId: req.user ? req.user.id : null,
  viewedAt: new Date(),
});

const totalViews = await View.count({
  where: {
    listingId: listing.id,
  },
});
    res.json({ id: listing.id, views: totalViews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to increment view" });
  }
};

exports.incrementLike = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByPk(id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const existingLike = await Like.findOne({
      where: {
        listingId: listing.id,
        userId: req.user.id,
      },
    });

    let liked = false;

    if (existingLike) {
      await existingLike.destroy();
    } else {
      await Like.create({
        listingId: listing.id,
        userId: req.user.id,
      });

      liked = true;
    }

    const totalLikes = await Like.count({
      where: {
        listingId: listing.id,
      },
    });

    res.json({
      liked,
      likes: totalLikes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update like",
    });
  }
};
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const listing = await Listing.findByPk(id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const comment = await Comment.create({
      listingId: listing.id,
      userId: req.user.id,
      content,
    });

    const fullComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: "commenter",
          attributes: ["id", "fullName", "username", "profileImage"],
        },
      ],
    });

    res.status(201).json({
      comment: fullComment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add comment",
    });
  }
};

exports.getMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByPk(id, {
      include: [
        {
          model: Media,
          as: "media",
          include: [
            {
              model: User,
              as: "owner",
              attributes: ["id", "fullName", "username", "profileImage"],
            },
          ],
        },
      ],
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const mediaItem = listing.media;
const views = await View.count({
  where: { listingId: listing.id },
});
  const likes = await Like.count({
  where: {
    listingId: listing.id,
  },
});
 const comments = await Comment.findAll({
  where: {
    listingId: listing.id,
  },
  include: [
    {
      model: User,
      as: "commenter",
      attributes: [
        "id",
        "fullName",
        "username",
        "profileImage",
      ],
    },
  ],
  order: [["createdAt", "DESC"]],
});

    res.json({
      id: listing.id,
      mediaId: mediaItem.id,
      title: mediaItem.title,
      description: mediaItem.description,
      fileType: mediaItem.fileType,
      mimeType: mediaItem.mimeType,
      price: listing.price,
      currency: listing.currency,
      stock: listing.stock,
      licenseType: listing.licenseType,
      isForSale: listing.isForSale,
      category: mediaItem.category,
      image: getImageUrl(mediaItem.filePath, req),
      creator: mediaItem.owner?.fullName || mediaItem.owner?.username || "Creator",
      creatorSlug: mediaItem.owner
        ? String(mediaItem.owner.username || mediaItem.owner.fullName)
            .toLowerCase()
            .replace(/\s+/g, "-")
        : "creator",
      creatorProfileImage: mediaItem.owner?.profileImage || null,
      views,
      likes,
      comments,
      createdAt: listing.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load listing" });
  }
};

exports.getUserMedia = async (req, res) => {
  try {
    const media = await Media.findAll({
      where: { uploadedBy: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user media" });
  }
};

exports.getAllMedia = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      where: {
        status: "active",
        isForSale: true,
      },
      include: [
        {
          model: Media,
          as: "media",
          where: {
            visibility: "public",
            status: "published",
          },
          include: [
            {
              model: User,
              as: "owner",
              attributes: ["id", "fullName", "username", "profileImage"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const mapped = await Promise.all(
      listings.map(async (listing) => {
        const mediaItem = listing.media;
        const category = mediaItem.category || mapCategory(mediaItem.fileType).category;
        const categorySlug = mediaItem.category
          ? mediaItem.category.toLowerCase().replace(/\s+/g, "-")
          : mapCategory(mediaItem.fileType).categorySlug;
        const creatorName = mediaItem.owner?.fullName || mediaItem.owner?.username || "Creator";
        const creatorSlug = mediaItem.owner
          ? String(mediaItem.owner.username || creatorName)
              .toLowerCase()
              .replace(/\s+/g, "-")
          : "creator";
        const views = await View.count({
  where: { listingId: listing.id },
});
const likes = await Like.count({
    where: { listingId: listing.id }
});
       const comments = await Comment.count({
    where: { listingId: listing.id }
});

        return {
          id: listing.id,
          mediaId: mediaItem.id,
          title: mediaItem.title,
          description: mediaItem.description,
          price: listing.price,
          fileType: mediaItem.fileType,
          mimeType: mediaItem.mimeType,

          currency: listing.currency,
          stock: listing.stock,
          licenseType: listing.licenseType,
          isForSale: listing.isForSale,
          category,
          categorySlug,
          image: getImageUrl(mediaItem.filePath, req),
          creator: creatorName,
          creatorSlug,
          creatorProfileImage: mediaItem.owner?.profileImage || null,
          uploadedBy: mediaItem.uploadedBy,
          views,
          likes,
          comments,
          createdAt: listing.createdAt,
        };
      })
    );

    res.json(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch media",
    });
  }
};
