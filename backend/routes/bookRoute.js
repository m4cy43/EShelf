const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookByUuid,
  getSimplyBooks,
  getRecursivelyBooks,
  getAuthorsBooks,
  createBook,
  deleteBook,
  incBookNum,
  decBookNum
} = require("../controllers/bookController");

// Auth middleware
// Routes protection
const authProtection = require("../middleware/authMiddleware");

// GET /api/book
// POST /api/book
router.route("/").get(getAllBooks).post(authProtection, createBook);
// GET /api/book/one/{uuid}
// DELETE /api/book/one/{uuid}
router.route("/one/:uuid").delete(authProtection, deleteBook).get(getBookByUuid);
// GET /api/book/find?title=_
router.route("/find").get(getSimplyBooks);
// GET /api/book/afind?title=_&author=_&year=_&genre=_&section=_
router.route("/afind").get(getRecursivelyBooks);
// GET /api/book/authorall/{uuid}
router.route("/authorall/:uuid").get(getAuthorsBooks);
// PUT /api/book/inc/{uuid}
router.route("/inc/:uuid").put(authProtection, incBookNum);
// PUT /api/book/dec/{uuid}
router.route("/dec/:uuid").put(authProtection, decBookNum);

module.exports = router;
