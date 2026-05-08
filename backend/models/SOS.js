const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  address: String,
  city: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SOS", sosSchema);