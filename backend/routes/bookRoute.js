const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getSimplyBooks,
  getRecursivelyBooks,
  createBook,
  deleteBook,
} = require("../controllers/bookController");

// Auth middleware
// Routes protection
const authProtection = require("../middleware/authMiddleware");

// GET /api/book
// POST /api/book
router.route("/").get(getAllBooks).post(authProtection, createBook);
// DELETE /api/book/{uuid}
router.route("/:uuid").delete(authProtection, deleteBook);
// POST /api/book/find
router.route("/find").post(getSimplyBooks);
// POST /api/book/rfind
router.route("/rfind").post(getRecursivelyBooks);

module.exports = router;
