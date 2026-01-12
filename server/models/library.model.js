const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    books: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        shelf: { type: String, enum: ["Want to Read", "Currently Reading", "Read"], default: "Want to Read" },
        progress: { type: Number, default: 0 }, // pages read
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Library", librarySchema);
