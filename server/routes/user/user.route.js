// routes/userRoutes.js
const express = require("express");
const { createUser, getUserByEmail } = require("./user.controller");

const router = express.Router();

// Route to create a user (for checkout)
router.post("/create", createUser);

// Route to get a user by email (useful if you're checking out with an existing user)
router.get("/:email", getUserByEmail);

module.exports = router;
