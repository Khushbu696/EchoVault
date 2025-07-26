const mongoose = require('mongoose');

const capsuleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  mediaUrls: [String],
  recipientEmail: {
    type: String,
    required: true,
  },
  unlockDate: {
    type: Date,
    required: true,
  },
  isUnlocked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Capsule', capsuleSchema);
