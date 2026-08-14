const sequelize = require("../config/database");

const User = require("./User");
const Media = require("./media");
const Listing = require("./Listing");
const Like = require("./Like");
const View = require("./View");
const Comment = require("./Comment");
const Order = require("./Order");

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
});

Like.belongsTo(User, {
  foreignKey: "userId",
});

Listing.hasMany(Like, {
  foreignKey: "listingId",
});

Like.belongsTo(Listing, {
  foreignKey: "listingId",
});

/* ===========================
   LISTING ↔ COMMENTS
=========================== */

User.hasMany(Comment, {
  foreignKey: "userId",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

Listing.hasMany(Comment, {
  foreignKey: "listingId",
});

Comment.belongsTo(Listing, {
  foreignKey: "listingId",
});

/* ===========================
   LISTING ↔ VIEWS
=========================== */

Listing.hasMany(View, {
  foreignKey: "listingId",
});

View.belongsTo(Listing, {
  foreignKey: "listingId",
});

/* ===========================
   LISTING ↔ ORDERS
=========================== */

User.hasMany(Order, {
  foreignKey: "buyerId",
  as: "orders",
});

Order.belongsTo(User, {
  foreignKey: "buyerId",
  as: "buyer",
});

Listing.hasMany(Order, {
  foreignKey: "listingId",
});

Order.belongsTo(Listing, {
  foreignKey: "listingId",
});

/* ===========================
   EXPORTS
=========================== */

module.exports = {
  sequelize,
  User,
  Media,
  Listing,
  Like,
  View,
  Comment,
  Order,
};