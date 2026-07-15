const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Listing = sequelize.define(
  "Listing",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    mediaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "KES",
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    licenseType: {
      type: DataTypes.ENUM(
        "standard",
        "extended",
        "exclusive"
      ),
      defaultValue: "standard",
    },

    isForSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    status: {
      type: DataTypes.ENUM(
        "draft",
        "active",
        "sold",
        "archived"
      ),
      defaultValue: "active",
    },

    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    tableName: "Listings",
    timestamps: true,
  }
);

module.exports = Listing;