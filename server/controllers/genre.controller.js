const Genre = require("../models/genre.model");

// Create genre (Admin)
const createGenre = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name required" });

    const existing = await Genre.findOne({ name });
    if (existing)
      return res.status(400).json({ success: false, message: "Genre already exists" });

    const genre = await Genre.create({ name });
    res.status(201).json({ success: true, genre });
  } catch (err) {
    next(err);
  }
};

// Get all genres
const getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find();
    res.json({ success: true, genres });
  } catch (err) {
    next(err);
  }
};

// Get single genre
const getGenreById = async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ success: false, message: "Genre not found" });
    res.json({ success: true, genre });
  } catch (err) {
    next(err);
  }
};

// Update genre (Admin)
const updateGenre = async (req, res, next) => {
  try {
    const { name } = req.body;
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ success: false, message: "Genre not found" });

    if (name) genre.name = name;
    await genre.save();
    res.json({ success: true, genre });
  } catch (err) {
    next(err);
  }
};

// Delete genre (Admin)
const deleteGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ success: false, message: "Genre not found" });

    await genre.remove();
    res.json({ success: true, message: "Genre deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createGenre, getAllGenres, getGenreById, updateGenre, deleteGenre };
