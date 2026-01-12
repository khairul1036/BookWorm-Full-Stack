const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./user.route"));
router.use("/books", require("./book.route"));

module.exports = router;
