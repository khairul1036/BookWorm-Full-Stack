const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/library.controller");
const authMiddleware = require("../middleware/auth.middleware");

// User library shelves
router.get("/", authMiddleware, libraryController.getMyLibrary);
router.post("/add", authMiddleware, libraryController.addToShelf);
router.patch("/progress/:bookId", authMiddleware, libraryController.updateProgress);
router.delete("/remove/:bookId", authMiddleware, libraryController.removeFromShelf);

module.exports = router;
