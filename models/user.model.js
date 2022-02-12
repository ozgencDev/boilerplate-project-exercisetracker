const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    description: String,
    duration: Number,
    date: String,
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    count: Number,
    log: [exerciseSchema],
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
