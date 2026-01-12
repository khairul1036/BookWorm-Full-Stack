const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const upload = require("../middleware/upload.middleware");

// CRUD Books
router.post("/", authMiddleware, adminMiddleware, upload.single("file"), bookController.createBook);
router.get("/", authMiddleware, bookController.getAllBooks);
router.get("/:id", authMiddleware, bookController.getBookById);
router.patch("/:id", authMiddleware, adminMiddleware, upload.single("file"), bookController.updateBook);
router.delete("/:id", authMiddleware, adminMiddleware, bookController.deleteBook);

module.exports = router;
