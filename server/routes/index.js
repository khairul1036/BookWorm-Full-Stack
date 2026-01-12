const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./user.route"));
router.use("/books", require("./book.route"));
router.use("/genres", require("./genre.route"));
router.use("/library", require("./library.route"));
router.use("/reviews", require("./review.route"));
router.use("/recommendations", require("./recommendation.route"));
router.use("/dashboard", require("./dashboard.route"));
router.use("/activity", require("./activity.route"));

module.exports = router;
