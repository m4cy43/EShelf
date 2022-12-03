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
router.put("/setadm/:uuid", authProtection, setAdmin);
router.put("/sadm", authProtection, setSAdmin);
// GET /api/user/unveruser
// GET /api/user/debtuser
router.get("/unveruser", authProtection, getUnverified);
router.get("/debtuser", authProtection, getDebts);

module.exports = router;
