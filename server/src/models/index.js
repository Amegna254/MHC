const sequelize = require("../config/database");

const User = require("./User");
const Media = require("./media");
const Listing = require("./Listing");
const Like = require("./Like");
const View = require("./View");
const Comment = require("./Comment");
const Order = require("./Order");
const Follow = require("./Follow");

/* ===========================
   USER ↔ MEDIA
=========================== */

User.hasMany(Media, {
  foreignKey: "uploadedBy",
  as: "media",
});

Media.belongsTo(User, {
  foreignKey: "uploadedBy",
  as: "owner",
});

/* ===========================
   MEDIA ↔ LISTING
=========================== */

Media.hasOne(Listing, {
  foreignKey: "mediaId",
  as: "listing",
});

Listing.belongsTo(Media, {
  foreignKey: "mediaId",
  as: "media",
});

User.hasMany(Listing, {
  foreignKey: "sellerId",
  as: "listings",
});

Listing.belongsTo(User, {
  foreignKey: "sellerId",
  as: "seller",
});
/* ===========================
   LISTING ↔ LIKES
=========================== */

User.hasMany(Like, {
  foreignKey: "userId",
  as: "likes",
});

Like.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Listing.hasMany(Like, {
  foreignKey: "listingId",
  as: "likes",
});

Like.belongsTo(Listing, {
  foreignKey: "listingId",
  as: "listing",
});
/* ===========================
   MEDIA ↔ COMMENTS
=========================== */

User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "commenter",
});

Listing.hasMany(Comment, {
  foreignKey: "listingId",
  as: "comments",
});

Comment.belongsTo(Listing, {
  foreignKey: "listingId",
  as: "listing",
});
/* ===========================
   MEDIA ↔ VIEWS
=========================== */

Listing.hasMany(View, {
  foreignKey: "listingId",
  as: "views",
});

View.belongsTo(Listing, {
  foreignKey: "listingId",
  as: "listing",
});
User.hasMany(View, {
  foreignKey: "userId",
  as: "views",
});

View.belongsTo(User, {
  foreignKey: "userId",
  as: "viewer",
});

/* ===========================
   ORDERS
=========================== */

User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
});

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "buyer",
});

Media.hasMany(Order, {
  foreignKey: "mediaId",
  as: "orders",
});

Order.belongsTo(Media, {
  foreignKey: "mediaId",
  as: "media",
});

Listing.hasMany(Order, {
  foreignKey: "listingId",
  as: "orders",
});

Order.belongsTo(Listing, {
  foreignKey: "listingId",
  as: "listing",
});

/* ===========================
   USER ↔ FOLLOWS
=========================== */

// Users who follow others
User.hasMany(Follow, {
  foreignKey: "followerId",
  as: "following",
});

Follow.belongsTo(User, {
  foreignKey: "followerId",
  as: "follower",
});

// Users being followed
User.hasMany(Follow, {
  foreignKey: "followingId",
  as: "followers",
});

Follow.belongsTo(User, {
  foreignKey: "followingId",
  as: "followingUser",
});

/* ===================================================
   EXPORTS
=================================================== */

module.exports = {
  sequelize,
  User,
  Media,
  Listing,
  Like,
  Comment,
  View,
  Order,
  Follow,
};