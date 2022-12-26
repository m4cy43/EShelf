const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/debtController");

// Auth middleware
// Routes protection
const authProtection = require("../middleware/authMiddleware");

// GET /api/debt
// PUT /api/debt?user=_&book=_
// DELETE /api/debt?user=_&book=_
router
  .route("/")
  .get(authProtection, getDebts)
  .put(authProtection, debtTheBook)
  .delete(authProtection, deleteUserDebt);
// GET /api/debt/auth
router.route("/auth").get(authProtection, getUserDebts);
// GET /api/debt/book
// DELETE /api/debt/book?user=_&book=_
router
  .route("/book")
  .get(authProtection, getBooked)
  .delete(authProtection, deleteBookingAdm);
// GET /api/debt/authbook
router.get("/authbook", authProtection, getUserBookings);
// POST /api/book/{uuid}
router.post("/book/:uuid", authProtection, bookTheBook);
// DELETE /api/debt/delbook/{uuid}
router.delete("/delbook/:uuid", authProtection, deleteBooking);
// GET /api/debt/onebook/:uuid
router.get("/onebook/:uuid", authProtection, oneBookDebt);
// GET /api/debt/both
router.get("/both", authProtection, getUsersBoth);

module.exports = router;
