"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      buyerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      listingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Listings",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      currency: {
        type: Sequelize.STRING,
        defaultValue: "KES",
      },

      paymentMethod: {
        type: Sequelize.ENUM(
          "mpesa",
          "card",
          "paypal"
        ),
        defaultValue: "mpesa",
      },

      paymentReference: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      mpesaReceipt: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
          "pending",
          "paid",
          "cancelled",
          "refunded"
        ),
        defaultValue: "pending",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Orders");
  },
};