const router = require("express").Router();
const userRoutes = require("./user");
const authRoutes = require("./auth");

// User routes
router.use("/user", userRoutes);

// User Authentication Routes
router.use("/auth", authRoutes);


module.exports = router;
