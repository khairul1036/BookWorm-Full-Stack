const Review = require("../models/review.model");
const Book = require("../models/book.model");

// Submit review (User)
const submitReview = async (req, res, next) => {
  try {
    const { bookId, rating, comment } = req.body;
    if (!bookId || !rating) return res.status(400).json({ success: false, message: "Book and rating required" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    const review = await Review.create({
      user: req.user._id,
      book: bookId,
      rating,
      comment,
      status: "pending",
    });

    res.status(201).json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// Admin: get pending reviews
const getPendingReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ status: "pending" }).populate("user", "name").populate("book", "title");
    res.json({ success: true, reviews });
  } catch (err) {
    next(err);
  }
};

// Approve review
const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    review.status = "approved";
    await review.save();
    res.json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// Delete review
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    await review.remove();
    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitReview, getPendingReviews, approveReview, deleteReview };
