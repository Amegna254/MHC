const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Password Reset
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },

  profileImage: {
    type: DataTypes.STRING,
    defaultValue: "",
  },

  bio: {
  type: DataTypes.TEXT,
  allowNull: true,
},
}, {
  timestamps: true,
});

module.exports = User;