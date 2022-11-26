const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const db = new Sequelize("eshelf", "root", "malvina", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const tableSync = async () => {
  let tableList = [];
  const Author = require("../models/authorModel");
  const AuthorRef = require("../models/authorRefModel");
  const Book = require("../models/bookModel");
  const Debt = require("../models/debtModel");
  const Genre = require("../models/genreModel");
  const GenreRef = require("../models/genreRefModel");
  const Section = require("../models/sectionModel");
  const User = require("../models/userModel");
  tableList.push(User, Section, Genre, Author, Book, Debt, GenreRef, AuthorRef);

  for (table of tableList) {
    await table
      .sync({ alter: true })
      .then((data) => {
        console.log(`Table ${table.toString()} and it model are synced`);
      })
      .catch((err) => {
        console.log(`Table ${table.toString()} sync error`);
        throw err;
      });
  }
};

module.exports = { db, tableSync };
