const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activity.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Get activity feed of followed users
router.get("/", authMiddleware, activityController.getActivityFeed);

module.exports = router;
