const Book = require("../models/book.model");
const { uploadFile, deleteFile } = require("../config/upload");
const fs = require("fs");

// Create book (Admin only)
const createBook = async (req, res, next) => {
  try {
    const { title, author, genre, description, totalPages } = req.body;
    if (!title || !author || !genre)
      return res.status(400).json({ success: false, message: "Title, author, genre required" });

    let coverUrl = null;
    let apiFileId = null;

    if (req.file) {
      const uploaded = await uploadFile(req.file.path);
      coverUrl = uploaded.url;
      apiFileId = uploaded.id;
      fs.unlinkSync(req.file.path);
    }

    const book = await Book.create({
      title,
      author,
      genre,
      description,
      cover: coverUrl,
      apiFileId,
      totalPages: totalPages || 0,
    });

    res.status(201).json({ success: true, book });
  } catch (err) {
    next(err);
  }
};

// Get all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json({ success: true, books });
  } catch (err) {
    next(err);
  }
};

// Get single book
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, book });
  } catch (err) {
    next(err);
  }
};

// Update book (Admin only)
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    const { title, author, genre, description, totalPages } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (description) book.description = description;
    if (totalPages) book.totalPages = totalPages;

    // Replace cover if new file
    if (req.file) {
      if (book.apiFileId) await deleteFile(book.apiFileId);
      const uploaded = await uploadFile(req.file.path);
      book.cover = uploaded.url;
      book.apiFileId = uploaded.id;
      fs.unlinkSync(req.file.path);
    }

    await book.save();
    res.json({ success: true, book });
  } catch (err) {
    next(err);
  }
};

// Delete book (Admin only)
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    if (book.apiFileId) await deleteFile(book.apiFileId);

    await book.remove();
    res.json({ success: true, message: "Book deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
