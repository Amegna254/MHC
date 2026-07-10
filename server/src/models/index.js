const User = require("./User");
const Media = require("./Media");
const Listing = require("./Listing");
const Like = require("./Like");
const Comment = require("./Comment");
const View = require("./View");
const Order = require("./Order");

// Core media ownership
Media.belongsTo(User, {
  foreignKey: "uploadedBy",
  as: "uploader",
});
User.hasMany(Media, {
  foreignKey: "uploadedBy",
});

// Marketplace listing
Listing.belongsTo(Media, {
  foreignKey: "mediaId",
  as: "media",
});
Media.hasMany(Listing, {
  foreignKey: "mediaId",
});

// Engagement models
Like.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasMany(Like, {
  foreignKey: "userId",
});
Like.belongsTo(Media, {
  foreignKey: "mediaId",
  as: "media",
});
Media.hasMany(Like, {
  foreignKey: "mediaId",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "commenter",
});
User.hasMany(Comment, {
  foreignKey: "userId",
});
Comment.belongsTo(Media, {
  foreignKey: "mediaId",
  as: "media",
});
Media.hasMany(Comment, {
  foreignKey: "mediaId",
});

View.belongsTo(User, {
  foreignKey: "userId",
  as: "viewer",
});
User.hasMany(View, {
  foreignKey: "userId",
});
View.belongsTo(Media, {
  foreignKey: "mediaId",
  as: "media",
});
Media.hasMany(View, {
  foreignKey: "mediaId",
});

// Orders
Order.belongsTo(User, {
  foreignKey: "userId",
  as: "buyer",
});
User.hasMany(Order, {
  foreignKey: "userId",
});
Order.belongsTo(Media, {
  foreignKey: "mediaId",
  as: "media",
});
Media.hasMany(Order, {
  foreignKey: "mediaId",
});

Order.belongsTo(Listing, {
  foreignKey: "listingId",
  as: "listing",
});
Listing.hasMany(Order, {
  foreignKey: "listingId",
});

module.exports = {
  User,
  Media,
  Listing,
  Like,
  Comment,
  View,
  Order,
};
