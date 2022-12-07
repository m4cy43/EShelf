const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAuthUser,
  changeCred,
  verifyUser,
  setAdmin,
  setSAdmin,
  getUnverified,
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
// PUT /api/user/chngcred
router.put("/chngcred", authProtection, changeCred);
// GET /api/user/verify
router.get("/verify", authProtection, getUnverified);
// PUT /api/user/verify/{uuid}
router.put("/verify/:uuid", authProtection, verifyUser);
// PUT /api/user/adm/{uuid}
router.put("/adm/:uuid", authProtection, setAdmin);
// PUT /api/user/sadm
router.put("/sadm", authProtection, setSAdmin);

module.exports = router;
