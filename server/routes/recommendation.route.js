const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendation.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Get personalized recommendations
router.get("/", authMiddleware, recommendationController.getRecommendations);

module.exports = router;
