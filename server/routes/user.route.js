const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Get all users (admin)
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);

// Get single user (admin)
router.get("/:id", authMiddleware, adminMiddleware, userController.getUserById);

// Update user role (admin)
router.patch("/role/:id", authMiddleware, adminMiddleware, userController.updateUserRole);

module.exports = router;
