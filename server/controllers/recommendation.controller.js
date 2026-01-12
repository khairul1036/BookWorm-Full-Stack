const Library = require("../models/library.model");
const Book = require("../models/book.model");

// Get personalized recommendations
const getRecommendations = async (req, res, next) => {
  try {
    const library = await Library.findOne({ user: req.user._id }).populate("books.book");

    let readBooks = [];
    let topGenres = [];

    if (library) {
      readBooks = library.books.filter((b) => b.shelf === "Read").map((b) => b.book._id);
      const genreCount = {};
      library.books.forEach((b) => {
        if (b.shelf === "Read") {
          genreCount[b.book.genre] = (genreCount[b.book.genre] || 0) + 1;
        }
      });
      topGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);
    }

    let recommended = [];
    if (readBooks.length >= 3) {
      recommended = await Book.find({ genre: { $in: topGenres }, _id: { $nin: readBooks } }).limit(12);
    } else {
      // fallback: popular + random
      recommended = await Book.find().limit(12);
    }

    res.json({ success: true, recommended });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRecommendations };
