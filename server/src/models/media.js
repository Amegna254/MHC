const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Media = sequelize.define("Media", {
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
  },

  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  fileType: {
    type: DataTypes.STRING,
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
});

module.exports = Media;