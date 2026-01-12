const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Admin dashboard stats
router.get("/admin", authMiddleware, adminMiddleware, dashboardController.getAdminDashboard);

// User dashboard stats
router.get("/user", authMiddleware, dashboardController.getUserDashboard);

module.exports = router;
