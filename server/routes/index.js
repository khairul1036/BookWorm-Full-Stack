const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./user.route"));
router.use("/books", require("./book.route"));
router.use("/genres", require("./genre.route"));
router.use("/library", require("./library.route"));
router.use("/reviews", require("./review.route"));

module.exports = router;
