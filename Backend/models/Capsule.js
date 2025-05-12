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
    mediaUrls: [String], // Array of image/video URLs
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
    isPrivate: {
        type: Boolean,
        default: false,
    },
    passcode: {
        type: String, // Optional: for protected capsules
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Capsule', capsuleSchema);
