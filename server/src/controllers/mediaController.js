const Media = require("../models/Media");
const Listing = require("../models/Listing");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const View = require("../models/View");
const User = require("../models/User");

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

    const fileType = req.file.mimetype.split("/")[0];
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
        price: req.body.price || `KES ${Math.max(100, Math.round((req.file.size || 1000) / 1000) * 100)}`,
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
      mediaId: listing.mediaId,
      userId: req.user ? req.user.id : null,
      viewedAt: new Date(),
    });

    const totalViews = await View.count({ where: { mediaId: listing.mediaId } });
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
      return res.status(404).json({ message: "Listing not found" });
    }

    const [like, created] = await Like.findOrCreate({
      where: {
        userId: req.user.id,
        mediaId: listing.mediaId,
      },
    });

    const totalLikes = await Like.count({ where: { mediaId: listing.mediaId } });
    res.json({ id: listing.id, likes: totalLikes, alreadyLiked: !created });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to increment like" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const listing = await Listing.findByPk(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const comment = await Comment.create({
      mediaId: listing.mediaId,
      userId: req.user.id,
      content,
    });

    res.status(201).json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add comment" });
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
              as: "uploader",
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
    const views = await View.count({ where: { mediaId: mediaItem.id } });
    const likes = await Like.count({ where: { mediaId: mediaItem.id } });
    const comments = await Comment.findAll({
      where: { mediaId: mediaItem.id },
      include: [
        {
          model: User,
          as: "commenter",
          attributes: ["id", "fullName", "username", "profileImage"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      id: listing.id,
      mediaId: mediaItem.id,
      title: mediaItem.title,
      description: mediaItem.description,
      price: listing.price,
      currency: listing.currency,
      stock: listing.stock,
      licenseType: listing.licenseType,
      isForSale: listing.isForSale,
      category: mediaItem.category,
      image: getImageUrl(mediaItem.filePath, req),
      creator: mediaItem.uploader?.fullName || mediaItem.uploader?.username || "Creator",
      creatorSlug: mediaItem.uploader
        ? String(mediaItem.uploader.username || mediaItem.uploader.fullName)
            .toLowerCase()
            .replace(/\s+/g, "-")
        : "creator",
      creatorProfileImage: mediaItem.uploader?.profileImage || null,
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
              as: "uploader",
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
        const creatorName = mediaItem.uploader?.fullName || mediaItem.uploader?.username || "Creator";
        const creatorSlug = mediaItem.uploader
          ? String(mediaItem.uploader.username || creatorName)
              .toLowerCase()
              .replace(/\s+/g, "-")
          : "creator";
        const views = await View.count({ where: { mediaId: mediaItem.id } });
        const likes = await Like.count({ where: { mediaId: mediaItem.id } });
        const comments = await Comment.count({ where: { mediaId: mediaItem.id } });

        return {
          id: listing.id,
          mediaId: mediaItem.id,
          title: mediaItem.title,
          description: mediaItem.description,
          price: listing.price,
          currency: listing.currency,
          stock: listing.stock,
          licenseType: listing.licenseType,
          isForSale: listing.isForSale,
          category,
          categorySlug,
          image: getImageUrl(mediaItem.filePath, req),
          creator: creatorName,
          creatorSlug,
          creatorProfileImage: mediaItem.uploader?.profileImage || null,
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
