const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: 'pending',
  },

  submittedBy: {
    type: String,
    default: 'Anonymous',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);