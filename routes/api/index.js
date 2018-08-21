const router = require("express").Router();
const authorRoutes = require("./author");
const postRoutes = require("./post");

// Book routes
router.use("/authors", authorRoutes);
router.use("/posts", postRoutes);

module.exports = router;
