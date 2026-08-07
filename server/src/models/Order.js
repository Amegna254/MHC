const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING,
      defaultValue: "KES",
    },

    paymentMethod: {
      type: DataTypes.ENUM(
        "mpesa",
        "card",
        "paypal"
      ),
      defaultValue: "mpesa",
    },

    paymentReference: {
      type: DataTypes.STRING,
    },

    mpesaReceipt: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "paid",
        "cancelled",
        "refunded"
      ),
      defaultValue: "pending",
    },
  },
  {
    tableName: "Orders",
    timestamps: true,
  }
);

module.exports = Order;