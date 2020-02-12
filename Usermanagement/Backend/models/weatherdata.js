const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const { ObjectId } = mongoose.Schema;

const weatherdata = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    required: true
  },
  year: {
    type: String,
  },
  month: {
    type: String,
  },
  day: {
    type: String,
  },
  starthour: {
    type: String,
  },
  starthour: {
    type: String,
  }
});

// virtual field
module.exports = mongoose.model("weatherdata");
