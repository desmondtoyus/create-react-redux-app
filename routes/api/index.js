const router = require("express").Router();
const authorRoutes = require("./author");
const postRoutes = require("./post");
const bookRoutes = require("./book");
const authRoutes = require("./auth");
// Book routes
router.use("/authors", authorRoutes);
router.use("/posts", postRoutes);
router.use("/auth", authRoutes);
router.use("/books", bookRoutes);


module.exports = router;
