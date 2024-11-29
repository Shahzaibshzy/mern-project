// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
});

module.exports = mongoose.model("User", userSchema);
