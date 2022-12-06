const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Debt = require("../models/debtModel");
const Book = require("../models/bookModel");
const { Op } = require("sequelize");

// Create new user
// POST /api/user/signup
// Public
const createUser = asyncHandler(async (req, res) => {
  const { email, password, name, surname, phone } = req.body;

  // Check the value
  if (!email || !password || !name || !surname || !phone) {
    res.status(400);
    throw new Error("Value is missing");
  }

  // Check if user exists by email
  const checkIfUserExists = await User.findOne({ where: { email } });
  if (checkIfUserExists) {
    res.status(400);
    throw new Error("The user already exists");
  }

  // Encryption & hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password.toString(), salt);

  // Create new user
  const user = await User.create({
    email: email,
    password: hash,
    name: name,
    surname: surname,
    phone: phone,
  });
  if (user) {
    res.status(201).json({
      uuid: user.uuid,
      email: user.email,
      token: generateJWT(user.uuid),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login user
// POST /api/user/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Get user by email
  // Check the password
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      uuid: user.uuid,
      email: user.email,
      token: generateJWT(user.uuid),
    });
  } else {
    res.status(400);
    throw new Error("Wrong email or password");
  }
});

// Check auth (dev private)
// GET /api/user/authuser
// Private
const getAuthUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Verify the user (admin private)
// PUT /api/user/verify/{uuid}
// Private
const verifyUser = asyncHandler(async (req, res) => {
  let user = await User.findByPk(req.params.uuid);

  // Check the unverified user exists
  if (!user) {
    res.status(401);
    throw new Error("There is no such user");
  }
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  // Check if user already verified
  if (user.isVerified === true) {
    res.status(401);
    throw new Error("User already verified");
  }

  user.isVerified = true;
  await user.save();
  res.status(200).json({
    uuid: user.uuid,
    email: user.email,
    isVerified: user.isVerified,
  });
});

// Set admin rights (superadmin private)
// PUT /api/user/adm/{uuid}
// Private
const setAdmin = asyncHandler(async (req, res) => {
  let user = await User.findByPk(req.params.uuid);

  // Check the unverified user exists
  if (!user) {
    res.status(401);
    throw new Error("There is no such user");
  }
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  // Check if auth user has superadmin rights
  if (req.user.email !== "superadmin@eshelf.adm") {
    res.status(401);
    throw new Error("Unauthorized");
  }
  // Check if user already verified
  if (user.isAdmin === true) {
    res.status(401);
    throw new Error("User already verified");
  }

  user.isAdmin = true;
  user.isVerified = true;
  await user.save();
  res.status(200).json({
    uuid: user.uuid,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// Create the superadmin
// PUT /api/user/sadm
// Private
const setSAdmin = asyncHandler(async (req, res) => {
  let sadmin = await User.findOne({
    where: { email: "superadmin@eshelf.adm" },
  });
  if (!sadmin) {
    res.status(401);
    throw new Error("There is no superadmin account yet");
  }
  if (sadmin.isAdmin) {
    res.status(418);
    throw new Error("Already admin");
  }
  // Check if auth user has superadmin rights
  if (req.user.email !== "superadmin@eshelf.adm") {
    res.status(401);
    throw new Error("Unauthorized");
  }
  sadmin.isAdmin = true;
  sadmin.isVerified = true;
  await sadmin.save();
  res.status(200).json({ sadmin });
});

// Get all unverified users
// GET /api/user/verify
// Private
const getUnverified = asyncHandler(async (req, res) => {
  const user = await User.findAll({
    where: { isVerified: false },
    order: [[User, "updatedAt", "DESC"]],
  });
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  res.status(200).json({ user });
});

// Get all users with debts
// GET /api/user/debt
// Private
const getDebts = asyncHandler(async (req, res) => {
  const user = await User.findAll({
    include: { model: Book },
    where: { "$books.debt.isDebted$": true },
    order: [[Book, Debt, "updatedAt", "DESC"]],
  });
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  res.status(200).json({ user });
});

// Get all users with debts
// GET /api/user/book
// Private
const getBooked = asyncHandler(async (req, res) => {
  const user = await User.findAll({
    include: { model: Book },
    where: { "$books.debt.isBooked$": true },
    order: [[Book, Debt, "updatedAt", "DESC"]],
  });
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  res.status(200).json({ user });
});

// Booked the book for user
// POST /api/user/book/{uuid}
// Private
const bookTheBook = asyncHandler(async (req, res) => {
  let user = await User.findByPk(req.user.uuid);
  if (!user || !user.isVerified) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  let book = await Book.findByPk(req.params.uuid);
  if (!book) {
    res.status(401);
    throw new Error("There is no such book");
  }
  await user.addBook(book);
  let fromDebt = await Debt.findOne({ where: { userUuid: user.uuid } });
  fromDebt.isBooked = true;
  let datetochange = new Date(fromDebt.deadlineDate);
  datetochange.setDate(datetochange.getDate() + 7);
  fromDebt.deadlineDate = datetochange;
  await fromDebt.save();
  res.status(200).json({ fromDebt });
});

// Change from Booked to Debted
// PUT /api/user/debt?user=_&book=_
// Private
const debtTheBook = asyncHandler(async (req, res) => {
  const {user, book} = req.query;
  if (!user || !book){
    res.status(400);
    throw new Error("Wrong query");
  }
  let booked = await Debt.findOne({
    where: {
      [Op.and]: [{ userUuid: user }, { bookUuid: book }],
    },
  });
  if (!booked) {
    res.status(400);
    throw new Error("User do not exist or have no booked book");
  }
  if (booked.isDebted == true) {
    res.status(400);
    throw new Error("User already have a debt");
  }
  booked.isDebted = true;
  booked.isBooked = false;
  let datetochange = new Date();
  datetochange.setDate(datetochange.getDate() + 14);
  booked.deadlineDate = datetochange;
  await booked.save();
  res.status(200).json({ booked });
});

// Auxiliary function
// Token generator: Creates JWT
const generateJWT = (uuid) => {
  return jwt.sign({ uuid }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  createUser,
  loginUser,
  getAuthUser,
  verifyUser,
  setAdmin,
  setSAdmin,
  getUnverified,
  getDebts,
  getBooked,
  bookTheBook,
  debtTheBook,
};
