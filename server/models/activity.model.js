const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true }, // e.g., "added Book X to Read shelf"
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
