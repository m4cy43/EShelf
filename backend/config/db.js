const { Sequelize, DataTypes, where } = require("sequelize");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

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
  dialectOptions: {},
  timezone: "+02:00",
});

const tableSync = async () => {
  const Author = await require("../models/authorModel");
  const AuthorRef = await require("../models/authorRefModel");
  const Book = await require("../models/bookModel");
  const Debt = await require("../models/debtModel");
  const Genre = await require("../models/genreModel");
  const GenreRef = await require("../models/genreRefModel");
  const Section = await require("../models/sectionModel");
  const User = await require("../models/userModel");

  await Book.belongsToMany(Author, { through: AuthorRef });
  await Author.belongsToMany(Book, { through: AuthorRef });

  await Book.belongsToMany(Genre, { through: GenreRef });
  await Genre.belongsToMany(Book, { through: GenreRef });

  await Book.belongsToMany(User, { through: Debt });
  await User.belongsToMany(Book, { through: Debt });

  await Section.hasMany(Book);
  await Book.belongsTo(Section, {
    foreignKey: { name: "sectionUuid", type: DataTypes.UUID },
  });

  await db
    .sync()
    .then((data) => {
      console.log(`All tables and it models are synced`);
    })
    .catch((err) => {
      console.log(`Tables sync error`);
      throw err;
    });

  // Superadmin account creation
  // Encryption & hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("eshelfsecretpassword", salt);
  // Account creation
  await User.findOrCreate({
    where: {
      email: "superadmin@eshelf.adm",
    },
    defaults: {
      email: "superadmin@eshelf.adm",
      password: hash,
      name: "superadmin",
      surname: "eshelf",
      phone: "+380999999999",
      isAdmin: true,
      isVerified: true,
    },
  });
};

module.exports = { db, tableSync };
