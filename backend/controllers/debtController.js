const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Debt = require("../models/debtModel");
const Book = require("../models/bookModel");
const Author = require("../models/authorModel");
const { Op } = require("sequelize");

// Get all users with debts
// GET /api/debt
// Private
const getDebts = asyncHandler(async (req, res) => {
  const user = await User.findAll({
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: { "$books.debt.isDebted$": true },
    attributes: ["uuid", "email", "name", "surname", "phone"],
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
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: {
      [Op.and]: [{ "$books.debt.isDebted$": true }, { uuid: req.user.uuid }],
    },
    attributes: ["uuid", "email", "name", "surname", "phone"],
    order: [[Book, Debt, "updatedAt", "DESC"]],
  });
  res.status(200).json({ user });
});

// Get all users that booked the books
// GET /api/debt/book
// Private
const getBooked = asyncHandler(async (req, res) => {
  const user = await User.findAll({
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: { "$books.debt.isBooked$": true },
    attributes: ["uuid", "email", "name", "surname", "phone"],
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
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: {
      [Op.and]: [{ "$books.debt.isBooked$": true }, { uuid: req.user.uuid }],
    },
    attributes: ["uuid", "email", "name", "surname", "phone"],
    order: [[Book, Debt, "updatedAt", "DESC"]],
  });
  res.status(200).json({ user });
});

// Get all users that booked the books
// GET /api/debt/both
// Private
const getUsersBoth = asyncHandler(async (req, res) => {
  const user = await User.findAll({
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: {
      [Op.and]: [{ uuid: req.user.uuid }],
    },
    attributes: ["uuid", "email", "name", "surname", "phone"],
    order: [[Book, Debt, "updatedAt", "DESC"]],
  });
  res.status(200).json({ user });
});

// Get all users that booked the books
// GET /api/debt/onebook/:uuid
// Private
const oneBookDebt = asyncHandler(async (req, res) => {
  const user = await User.findAll({
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: {
      [Op.and]: [{ uuid: req.user.uuid }, { "$books.uuid$": req.params.uuid }],
    },
    attributes: ["uuid", "email", "name", "surname", "phone"],
  });
  res.status(200).json({ user });
});

// Booked the book for user
// POST /api/debt/book/{uuid}
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
  let debts = await Debt.findOne({
    where: {
      [Op.and]: [{ userUuid: user.uuid }, { bookUuid: req.params.uuid }],
    },
  });
  debts.isBooked = true;
  let datetochange = new Date(debts.deadlineDate);
  datetochange.setDate(datetochange.getDate() + 7);
  debts.deadlineDate = datetochange;
  await debts.save();

  user = await User.findAll({
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: {
      [Op.and]: [{ uuid: req.user.uuid }, { "$books.uuid$": req.params.uuid }],
    },
    attributes: ["uuid", "email", "name", "surname", "phone"],
  });
  res.status(200).json({ user });
});

// Change from Booked to Debted
// PUT /api/debt?user=_&book=_
// Private
const debtTheBook = asyncHandler(async (req, res) => {
  const { userq, bookq } = req.query;
  if (!userq || !bookq) {
    res.status(400);
    throw new Error("Wrong query");
  }
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  let changeNumber = await Book.findByPk(bookq);
  if (changeNumber.number == 0) {
    res.status(418);
    throw new Error("No available books");
  }
  let booked = await Debt.findOne({
    where: {
      [Op.and]: [{ userUuid: userq }, { bookUuid: bookq }],
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

  const user = await User.findAll({
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: {
      [Op.and]: [{ uuid: userq }, { "$books.uuid$": bookq }],
    },
    attributes: ["uuid", "email", "name", "surname", "phone"],
  });
  res.status(200).json({ user });
});

// Delete users debts
// DELETE api/debt?user=_&book=_
// Private
const deleteUserDebt = asyncHandler(async (req, res) => {
  const { userq, bookq } = req.query;
  if (!userq || !bookq) {
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
      [Op.and]: [{ userUuid: userq }, { bookUuid: bookq }],
    },
  });
  if (!debt) {
    res.status(400);
    throw new Error("User do not exist or have no debts");
  }
  if (debt.isDebted != true) {
    res.status(400);
    throw new Error("User have no debt");
  }
  await debt.destroy();
  let changeNumber = await Book.findByPk(bookq);
  changeNumber.debtedNumber--;
  changeNumber.number++;
  await changeNumber.save();

  const user = await User.findAll({
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: {
      [Op.and]: [{ uuid: userq }, { "$books.uuid$": bookq }],
    },
    attributes: ["uuid", "email", "name", "surname", "phone"],
  });
  res.status(200).json({ user });
});

// Delete user booking
// DELETE /api/debt/delbook/{uuid}
// Private
const deleteBooking = asyncHandler(async (req, res) => {
  const userq = req.user.uuid;
  const bookq = req.params.uuid;
  if (!userq || !bookq) {
    res.status(400);
    throw new Error("Wrong query");
  }
  let booking = await Debt.findOne({
    where: { [Op.and]: [{ userUuid: userq }, { bookUuid: bookq }] },
  });
  if (!booking || !booking.isBooked || booking.isDebted == 1) {
    res.status(400);
    throw new Error("No booking or the book is debted");
  }
  await booking.destroy();

  const user = await User.findAll({
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: {
      [Op.and]: [{ uuid: req.user.uuid }, { "$books.uuid$": req.params.uuid }],
    },
    attributes: ["uuid", "email", "name", "surname", "phone"],
  });
  res.status(200).json({ user });
});

// Delete user booking (adm)
// DELETE /api/debt/book?user=_&book=_
// Private
const deleteBookingAdm = asyncHandler(async (req, res) => {
  const { userq, bookq } = req.query;
  if (!userq || !bookq) {
    res.status(400);
    throw new Error("Wrong query");
  }
  // Check if auth user has admin rights
  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  let booking = await Debt.findOne({
    where: { [Op.and]: [{ userUuid: userq }, { bookUuid: bookq }] },
  });
  if (!booking || !booking.isBooked || booking.isDebted == 1) {
    res.status(400);
    throw new Error("No booking or the book is debted");
  }
  await booking.destroy();

  const user = await User.findAll({
    include: {
      model: Book,
      attributes: ["uuid", "title", "year"],
      through: { attributes: ["uuid", "isBooked", "isDebted", "deadlineDate"] },
      include: {
        model: Author,
        attributes: ["uuid", "name", "surname", "middlename"],
        through: {
          attributes: [],
        },
      },
    },
    where: {
      [Op.and]: [{ uuid: userq }, { "$books.uuid$": bookq }],
    },
    attributes: ["uuid", "email", "name", "surname", "phone"],
  });
  res.status(200).json({ user });
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
  deleteBookingAdm,
  oneBookDebt,
  getUsersBoth,
};
