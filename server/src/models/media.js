const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Media = sequelize.define(
  "Media",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },

    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fileType: {
      type: DataTypes.ENUM(
        "image",
        "video",
        "audio",
        "document",
        "other"
      ),
      allowNull: false,
    },

    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      defaultValue: "General",
    },

    visibility: {
      type: DataTypes.ENUM("public", "private"),
      defaultValue: "public",
    },

    status: {
      type: DataTypes.ENUM(
        "draft",
        "published",
        "archived"
      ),
      defaultValue: "published",
    },
  },
  {
    tableName: "Media",
    timestamps: true,
  }
);

module.exports = Media;