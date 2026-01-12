const User = require("../models/user.model");
const Book = require("../models/book.model");
const Library = require("../models/library.model");
const Review = require("../models/review.model");

// Admin dashboard stats
const getAdminDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const pendingReviews = await Review.countDocuments({ status: "pending" });

    // Books per genre
    const booksPerGenre = await Book.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalBooks,
        pendingReviews,
        booksPerGenre,
      },
    });
  } catch (err) {
    next(err);
  }
};

// User dashboard stats
const getUserDashboard = async (req, res, next) => {
  try {
    const library = await Library.findOne({ user: req.user._id }).populate("books.book");
    const totalRead = library ? library.books.filter((b) => b.shelf === "Read").length : 0;
    const totalPages = library
      ? library.books.reduce((sum, b) => sum + (b.progress || 0), 0)
      : 0;

    // Favorite genre breakdown
    const genreCount = {};
    if (library) {
      library.books.forEach((b) => {
        if (b.shelf === "Read") genreCount[b.book.genre] = (genreCount[b.book.genre] || 0) + 1;
      });
    }

    res.json({
      success: true,
      stats: {
        totalRead,
        totalPages,
        favoriteGenres: genreCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAdminDashboard, getUserDashboard };
