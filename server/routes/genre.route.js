const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genre.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Genres
router.post("/", authMiddleware, adminMiddleware, genreController.createGenre);
router.get("/", authMiddleware, genreController.getAllGenres);
router.get("/:id", authMiddleware, genreController.getGenreById);
router.patch("/:id", authMiddleware, adminMiddleware, genreController.updateGenre);
router.delete("/:id", authMiddleware, adminMiddleware, genreController.deleteGenre);

module.exports = router;
