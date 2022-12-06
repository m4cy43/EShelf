const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Debt = require("../models/debtModel");
const Book = require("../models/bookModel");
const { Op } = require("sequelize");

// Get all users with debts
// GET /api/debt
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
// GET /api/debt/auth
// Private
const getUserDebts = asyncHandler(async (req, res) => {
  const user = await User.findAll({
    include: { model: Book },
    where: {
      [Op.and]: [{ "$books.debt.isDebted$": true }, { uuid: req.user.uuid }],
    },
    order: [[Book, Debt, "updatedAt", "DESC"]],
  });
  res.status(200).json({ user });
});

// Get all users that booked the books
// GET /api/debt/book
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

// Get all users that booked the books
// GET /api/debt/authbook
// Private
const getUserBookings = asyncHandler(async (req, res) => {
  const user = await User.findAll({
    include: { model: Book },
    where: {
      [Op.and]: [{ "$books.debt.isBooked$": true }, { uuid: req.user.uuid }],
    },
    order: [[Book, Debt, "updatedAt", "DESC"]],
  });
  res.status(200).json({ user });
});

// Booked the book for user
// POST /api/debt/book/{uuid}
// Private
const bookTheBook = asyncHandler(async (req, res) => {
  let user = await User.findByPk(req.user.uuid);
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
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
// PUT /api/debt?user=_&book=_
// Private
const debtTheBook = asyncHandler(async (req, res) => {
  const { user, book } = req.query;
  if (!user || !book) {
    res.status(400);
    throw new Error("Wrong query");
  }
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  let changeNumber = await findByPk(book);
  if (changeNumber.number == 0) {
    res.status(204);
    throw new Error("No available books");
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
  changeNumber.debtedNumber++;
  changeNumber.number--;
  changeNumber.save();
  res.status(200).json({ booked });
});

// Delete users debts
// DELETE api/debt?user=_&book=_
// Private
const deleteUserDebt = asyncHandler(async (req, res) => {
  const { user, book } = req.query;
  if (!user || !book) {
    res.status(400);
    throw new Error("Wrong query");
  }
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  let debt = await Debt.findOne({
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
  await debt.destroy();
  let changeNumber = await Book.findByPk(book);
  changeNumber.debtedNumber--;
  changeNumber.number++;
  changeNumber.save();
  res.status(200).json({ uuid: req.params.uuid });
});

// Delete user booking
// DELETE /api/debt/delbook/{uuid}
// Private
const deleteBooking = asyncHandler(async (req, res) => {
  const user = req.user.uuid;
  const book = req.params;
  if (!user || !book) {
    res.status(400);
    throw new Error("Wrong query");
  }
  let booking = await Debt.findOne({
    where: { [Op.and]: [{ userUuid: user }, { bookUuid: book }] },
  });
  if (!booking || !booking.isBooked || booking.isDebted) {
    res.status(204);
    throw new Error("No booking or the book is debted");
  }
  await booking.destroy();
  res.status(200).json({ user: booking.userUuid, book: booking.bookUuid });
});

module.exports = {
  getDebts,
  getUserDebts,
  getBooked,
  getUserBookings,
  bookTheBook,
  debtTheBook,
  deleteUserDebt,
  deleteBooking,
};
