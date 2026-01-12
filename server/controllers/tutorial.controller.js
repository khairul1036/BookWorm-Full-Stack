const Tutorial = require("../models/tutorial.model");

// Get all tutorials
const getTutorials = async (req, res, next) => {
  try {
    const tutorials = await Tutorial.find().sort({ createdAt: -1 });
    res.json({ success: true, tutorials });
  } catch (err) {
    next(err);
  }
};

// Add tutorial (Admin)
const addTutorial = async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) return res.status(400).json({ success: false, message: "Title & URL required" });

    const tutorial = await Tutorial.create({ title, url });
    res.status(201).json({ success: true, tutorial });
  } catch (err) {
    next(err);
  }
};

// Update tutorial (Admin)
const updateTutorial = async (req, res, next) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ success: false, message: "Tutorial not found" });

    const { title, url } = req.body;
    if (title) tutorial.title = title;
    if (url) tutorial.url = url;

    await tutorial.save();
    res.json({ success: true, tutorial });
  } catch (err) {
    next(err);
  }
};

// Delete tutorial (Admin)
const deleteTutorial = async (req, res, next) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ success: false, message: "Tutorial not found" });

    await tutorial.remove();
    res.json({ success: true, message: "Tutorial deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTutorials, addTutorial, updateTutorial, deleteTutorial };
