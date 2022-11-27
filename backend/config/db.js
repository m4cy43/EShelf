const { Sequelize, DataTypes } = require("sequelize");
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
  const Author = require("../models/authorModel");
  const AuthorRef = require("../models/authorRefModel");
  const Book = require("../models/bookModel");
  const Debt = require("../models/debtModel");
  const Genre = require("../models/genreModel");
  const GenreRef = require("../models/genreRefModel");
  const Section = require("../models/sectionModel");
  const User = require("../models/userModel");

  Book.belongsToMany(Author, { through: AuthorRef });
  Author.belongsToMany(Book, { through: AuthorRef });

  Book.belongsToMany(Genre, { through: GenreRef });
  Genre.belongsToMany(Book, { through: GenreRef });

  Book.belongsToMany(User, { through: Debt });
  User.belongsToMany(Book, { through: Debt });

  Section.hasMany(Book);
  Book.belongsTo(Section, {
    foreignKey: { name: "sectionUuid", type: DataTypes.UUID },
  });

  db.sync({ alter: true })
    .then((data) => {
      console.log(`All tables and it models are synced`);
    })
    .catch((err) => {
      console.log(`Tables sync error`);
      throw err;
    });
};

module.exports = { db, tableSync };
