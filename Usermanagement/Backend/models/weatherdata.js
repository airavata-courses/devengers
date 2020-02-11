const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const { ObjectId } = mongoose.Schema;

const weatherdata = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    required: true
  },
  dateyear: {
    type: StriDateng,
  },
  hashed_password: {
    type: String,
    trim: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: Date,
  about: {
    type: String,
    trim: true
  }
});

// virtual field
module.exports = mongoose.model("weatherdata");
