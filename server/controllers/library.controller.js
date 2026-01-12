const Library = require("../models/library.model");
const Book = require("../models/book.model");

// Get current user's library
const getMyLibrary = async (req, res, next) => {
  try {
    const library = await Library.findOne({ user: req.user._id }).populate("books.book");
    res.json({ success: true, library });
  } catch (err) {
    next(err);
  }
};

// Add book to shelf
const addToShelf = async (req, res, next) => {
  try {
    const { bookId, shelf } = req.body;
    if (!bookId || !shelf) return res.status(400).json({ success: false, message: "Book ID and shelf required" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    let library = await Library.findOne({ user: req.user._id });
    if (!library) library = await Library.create({ user: req.user._id, books: [] });

    const existing = library.books.find((b) => b.book.toString() === bookId);
    if (existing) {
      existing.shelf = shelf; // move to different shelf
    } else {
      library.books.push({ book: bookId, shelf, progress: 0 });
    }

    await library.save();
    res.json({ success: true, library });
  } catch (err) {
    next(err);
  }
};

// Update reading progress
const updateProgress = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { progress } = req.body;
    if (progress == null) return res.status(400).json({ success: false, message: "Progress required" });

    const library = await Library.findOne({ user: req.user._id });
    if (!library) return res.status(404).json({ success: false, message: "Library not found" });

    const bookEntry = library.books.find((b) => b.book.toString() === bookId);
    if (!bookEntry) return res.status(404).json({ success: false, message: "Book not in library" });

    bookEntry.progress = progress;
    await library.save();
    res.json({ success: true, library });
  } catch (err) {
    next(err);
  }
};

// Remove book from shelf
const removeFromShelf = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const library = await Library.findOne({ user: req.user._id });
    if (!library) return res.status(404).json({ success: false, message: "Library not found" });

    library.books = library.books.filter((b) => b.book.toString() !== bookId);
    await library.save();
    res.json({ success: true, library });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMyLibrary, addToShelf, updateProgress, removeFromShelf };
