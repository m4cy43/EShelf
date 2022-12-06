const express = require("express");
const router = express.Router();
const {
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
  debtTheBook
} = require("../controllers/userController");

// Auth middleware
// Routes protection
const authProtection = require("../middleware/authMiddleware");

// POST /api/user/signup
router.post("/signup", createUser);
// POST /api/user/login
router.post("/login", loginUser);
// GET /api/user/authuser
router.get("/authuser", authProtection, getAuthUser);
// PUT /api/user/verify/{uuid}
// PUT /api/user/setadm/{uuid}
// PUT /api/user/setadm/{uuid}
router.put("/verify/:uuid", authProtection, verifyUser);
router.put("/adm/:uuid", authProtection, setAdmin);
router.put("/sadm", authProtection, setSAdmin);
// GET /api/user/verify
// GET /api/user/debt
// POST /api/user/book/{uuid}
// PUT /api/user/debt?user=_&book=_
// DELETE /api/user/debt?user=_&book=_
router.get("/verify", authProtection, getUnverified);
router.get("/debt", authProtection, getDebts);
router.get("/book", authProtection, getBooked);
router.post("/book/:uuid", authProtection, bookTheBook);
router.put("/debt", authProtection, debtTheBook);
router.delete("/debt", authProtection, debtTheBook);

module.exports = router;
