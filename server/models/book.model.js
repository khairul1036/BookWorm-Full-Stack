const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String },
    cover: { type: String }, // URL
    apiFileId: { type: Number }, // for uploader
    totalPages: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
