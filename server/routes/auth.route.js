const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

// Register
router.post("/register", upload.single("photo"), authController.register);

// Login
router.post("/login", authController.login);

// Get Current User
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
