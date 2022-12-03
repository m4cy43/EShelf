const express = require("express");
const router = express.Router();
const {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

// Auth middleware
// Routes protection
const authProtection = require("../middleware/authMiddleware");

// GET /api/author
// POST /api/author
router.route("/").get(authProtection, getAllAuthors).post(authProtection, createAuthor);
// PUT /api/author/{uuid}
// DELETE /api/author/{uuid}
router.route("/:uuid").put(authProtection, updateAuthor).delete(authProtection, deleteAuthor);

module.exports = router;
