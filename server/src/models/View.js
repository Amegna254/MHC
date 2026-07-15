const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const View = sequelize.define(
  "View",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    viewedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Views",
    timestamps: false,
  }
);

module.exports = View;