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
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "KES 0",
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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "standard",
    },
    isForSale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Listing;
