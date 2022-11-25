const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\+(380)[0-9]{9}$/
      }
    },
    IsAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    IsVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.sync()
  .then((data) => {
    console.log("Table and model are synced");
  })
  .catch((err) => {
    console.log("Sync error");
  });
module.exports = User;
