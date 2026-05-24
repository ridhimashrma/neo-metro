const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  routeNumber: {
    type: String,
    required: true,
  },

  routeName: {
    type: String,
    required: true,
  },

  driverName: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: 'on-time',
  },

  fuelLevel: {
    type: Number,
    default: 100,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Bus', busSchema);