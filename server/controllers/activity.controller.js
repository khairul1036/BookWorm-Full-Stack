const Activity = require("../models/activity.model");
const User = require("../models/user.model");

// Get activity feed of followed users
const getActivityFeed = async (req, res, next) => {
  try {
    // Example: fetch all activities of followed users
    const user = await User.findById(req.user._id).populate({
      path: "following",
      populate: { path: "activities", options: { sort: { createdAt: -1 }, limit: 20 } },
    });

    let feed = [];
    if (user.following.length) {
      user.following.forEach((followedUser) => {
        if (followedUser.activities) feed.push(...followedUser.activities);
      });

      // sort by latest
      feed.sort((a, b) => b.createdAt - a.createdAt);
    }

    res.json({ success: true, feed: feed.slice(0, 50) }); // limit 50 latest activities
  } catch (err) {
    next(err);
  }
};

module.exports = { getActivityFeed };
