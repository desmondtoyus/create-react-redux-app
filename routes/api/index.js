const router = require("express").Router();
// const authorRoutes = require("./author");
// const postRoutes = require("./post");
const authRoutes = require("./auth");
// const commentRoutes = require("./comment");

// Book routes
// router.use("/authors", authorRoutes);
router.use("/auth", authRoutes);
// router.use("/comment", commentRoutes);

// router.use("/books", bookRoutes);


module.exports = router;
