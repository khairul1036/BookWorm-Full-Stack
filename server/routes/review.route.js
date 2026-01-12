const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// User submits review
router.post("/", authMiddleware, reviewController.submitReview);

// Admin moderates reviews
router.get("/pending", authMiddleware, adminMiddleware, reviewController.getPendingReviews);
router.patch("/approve/:id", authMiddleware, adminMiddleware, reviewController.approveReview);
router.delete("/delete/:id", authMiddleware, adminMiddleware, reviewController.deleteReview);

module.exports = router;
