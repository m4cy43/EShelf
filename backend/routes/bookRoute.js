const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getSimplyBooks,
  getRecursivelyBooks,
  createBook,
  deleteBook,
} = require("../controllers/bookController");

// GET /api/book
// POST /api/book
router.route("/").get(getAllBooks).post(createBook);
// DELETE /api/book/{uuid}
router.route("/:uuid").delete(deleteBook);
// POST /api/book/find
router.route("/find").delete(getSimplyBooks);
// POST /api/book/rfind
router.route("/rfind").delete(getRecursivelyBooks);

module.exports = router;
