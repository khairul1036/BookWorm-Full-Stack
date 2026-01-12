const express = require("express");
const router = express.Router();
const tutorialController = require("../controllers/tutorial.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Get tutorials
router.get("/", authMiddleware, tutorialController.getTutorials);

// Admin adds tutorial
router.post("/", authMiddleware, adminMiddleware, tutorialController.addTutorial);
router.patch("/:id", authMiddleware, adminMiddleware, tutorialController.updateTutorial);
router.delete("/:id", authMiddleware, adminMiddleware, tutorialController.deleteTutorial);

module.exports = router;
