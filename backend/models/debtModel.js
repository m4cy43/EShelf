const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config/db");

const User = require("./userModel");
const Book = require("./bookModel");

const Debt = db.define(
  "debt",
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDebted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deadlineDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: (new Date())
    },
    bookUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Book,
        key: "uuid",
      },
    },
    userUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "uuid",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
  }
);

module.exports = Debt;
